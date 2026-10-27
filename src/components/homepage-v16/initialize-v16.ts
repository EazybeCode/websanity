import type { V16Labels } from './localize-v16'

/**
 * Ports the v16 design runtime's behaviour onto the static markup:
 * - page sections fade in once they enter the viewport (.sec -> .sec.in)
 * - StoryFlow: moments light up as they're seen (.mom.on + c0..c4 on the root),
 *   the sticky tab bar tracks the moment in view (act0..act3), and the AI-agent
 *   tabs auto-rotate every 7s (sc0..sc2) unless a visitor picks one.
 */
const AGENT_ROTATE_MS = 7000

export function initializeV16(root: HTMLElement, labels: V16Labels) {
  const cleanups: Array<() => void> = []

  const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-v16-sec]'))
  const reveal = (el: HTMLElement) => el.classList.add('in')
  if (typeof IntersectionObserver === 'undefined') {
    sections.forEach(reveal)
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target as HTMLElement)),
      { threshold: 0.01 },
    )
    sections.forEach((el) => io.observe(el))
    cleanups.push(() => io.disconnect())
  }

  const story = root.querySelector<HTMLElement>('.w4.st')
  if (story) cleanups.push(initializeStory(story))

  cleanups.push(fitWideMockups(root))

  const crmPreview = root.querySelector<HTMLImageElement>('#v16-crm-preview img')
  if (crmPreview) cleanups.push(initializeCrmTabs(root, crmPreview))

  const security = root.querySelector<HTMLElement>('.sec-card')
  if (security) cleanups.push(initializeSecurity(security, labels))

  const faq = root.querySelector<HTMLElement>('#faq')
  if (faq) cleanups.push(initializeFaq(faq, labels.more))

  return () => cleanups.forEach((fn) => fn())
}

/**
 * Product mockups drawn at a fixed desktop width (the conversation-management
 * diagram, the broadcast phone row) are zoomed down to fit narrower screens.
 * `zoom` (unlike transform) also shrinks their layout box, so nothing overflows.
 */
const WIDE_MOCKUPS = [
  "[style*='width: 1040px']",
  "[style*='grid-template-columns: repeat(5, 90px)']",
  // chat -> CRM card rows and the outreach phone rows
  "[style*='display: flex; align-items: center; gap: 0px; min-width: 0px; width: 100%']",
  '.bpanel > div',
]

function fitWideMockups(root: HTMLElement) {
  const els = Array.from(root.querySelectorAll<HTMLElement>(WIDE_MOCKUPS.join(','))).filter(
    (el) => getComputedStyle(el).position !== 'absolute',
  )
  // Desktop keeps the design as drawn; only tablets / phones (mobile.css range) scale.
  const small = window.matchMedia('(max-width: 900px)')
  const fit = () => {
    els.forEach((el) => {
      el.style.zoom = ''
      if (!small.matches) return
      // Measure against the nearest ancestor that itself fits the page (a parent
      // can be stretched by this very element).
      let box = el.parentElement
      while (box && box !== root && box.getBoundingClientRect().width > root.clientWidth + 1) box = box.parentElement
      if (!box) return
      const cs = getComputedStyle(box)
      const available = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      // Natural width = the furthest right edge of its content (rows set to width:100%
      // report their own width, not what overflows).
      const left = el.getBoundingClientRect().left
      let natural = el.scrollWidth
      el.querySelectorAll<HTMLElement>(':scope > *').forEach((c) => {
        natural = Math.max(natural, c.getBoundingClientRect().right - left)
      })
      if (natural > available + 1 && available > 0) el.style.zoom = String(Math.max(0.3, available / natural))
    })
  }
  fit()
  const ro = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(fit)
  if (ro) ro.observe(root)
  return () => ro?.disconnect()
}

/**
 * CRM section: each CRM tab swaps the preview to that CRM's screenshot (the same
 * images the previous homepage used), with a short fade.
 */
function initializeCrmTabs(root: HTMLElement, img: HTMLImageElement) {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('.crm-tab[data-crm-screen]'))
  // Warm the cache so switching doesn't flash an empty box.
  const preload = () => tabs.forEach((t) => { new Image().src = t.dataset.crmScreen! })
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { preload(); io.disconnect() }
  }, { rootMargin: '400px 0px' })
  io.observe(img)

  let timer: number | undefined
  const select = (tab: HTMLButtonElement) => {
    tabs.forEach((t) => {
      const on = t === tab
      t.classList.toggle('is-on', on)
      t.setAttribute('aria-selected', String(on))
    })
    if (img.getAttribute('src') === tab.dataset.crmScreen) return
    window.clearTimeout(timer)
    img.classList.add('is-swapping')
    timer = window.setTimeout(() => {
      img.src = tab.dataset.crmScreen!
      img.alt = `${tab.dataset.crmName} product-inspired preview`
      img.classList.remove('is-swapping')
    }, 180)
  }
  const onClick = (event: MouseEvent) => {
    const tab = (event.target as Element | null)?.closest<HTMLButtonElement>('.crm-tab')
    if (tab && tabs.includes(tab)) select(tab)
  }
  root.addEventListener('click', onClick)
  return () => {
    io.disconnect()
    window.clearTimeout(timer)
    root.removeEventListener('click', onClick)
  }
}

/**
 * Security section "try it" mockup:
 * - Sync business chats: a real on/off switch (its description says when sync is paused).
 * - Personal and private group chats: clicking it bounces back off with a lock note,
 *   because Eazybe never syncs personal chats.
 * - Access controls: a small listbox (Admin / Manager / Sales rep) that updates the copy.
 */
function initializeSecurity(card: HTMLElement, labels: V16Labels) {
  // The resting copy comes from the (localized) markup; the two runtime states from labels.
  const descs = card.querySelectorAll<HTMLElement>('.sw-desc')
  const SYNC_ON = descs[0]?.textContent ?? ''
  const SYNC_OFF = labels.syncPaused
  const PRIVATE_OFF = descs[1]?.textContent ?? ''
  const PRIVATE_LOCK = labels.privateLocked

  const sync = card.querySelector<HTMLButtonElement>('[data-sw="sync"]')
  const priv = card.querySelector<HTMLButtonElement>('[data-sw="private"]')
  const descOf = (sw: HTMLElement | null) => sw?.parentElement?.querySelector<HTMLElement>('.sw-desc') ?? null
  const btn = card.querySelector<HTMLButtonElement>('.acl-btn')
  const menu = card.querySelector<HTMLUListElement>('.acl-menu')
  const value = card.querySelector<HTMLElement>('.acl-v')
  const aclDesc = card.querySelector<HTMLElement>('.acl-desc')
  const aclDefault = aclDesc?.textContent ?? ''
  const options = Array.from(menu?.querySelectorAll<HTMLLIElement>('[role="option"]') ?? [])
  let lockTimer: number | undefined

  const setSync = (on: boolean) => {
    if (!sync) return
    sync.classList.toggle('is-on', on)
    sync.setAttribute('aria-checked', String(on))
    const d = descOf(sync)
    if (d) {
      d.textContent = on ? SYNC_ON : SYNC_OFF
      d.classList.toggle('is-paused', !on)
    }
  }
  const bouncePrivate = () => {
    if (!priv) return
    const d = descOf(priv)
    priv.classList.remove('is-locked')
    void priv.offsetWidth // restart the shake animation
    priv.classList.add('is-locked')
    if (d) {
      d.textContent = PRIVATE_LOCK
      d.classList.add('is-note')
    }
    window.clearTimeout(lockTimer)
    lockTimer = window.setTimeout(() => {
      priv.classList.remove('is-locked')
      if (d) {
        d.textContent = PRIVATE_OFF
        d.classList.remove('is-note')
      }
    }, 2600)
  }

  const open = (focusSelected: boolean) => {
    if (!menu || !btn) return
    menu.hidden = false
    btn.setAttribute('aria-expanded', 'true')
    if (focusSelected) (options.find((o) => o.getAttribute('aria-selected') === 'true') ?? options[0])?.focus()
  }
  const close = (returnFocus: boolean) => {
    if (!menu || !btn || menu.hidden) return
    menu.hidden = true
    btn.setAttribute('aria-expanded', 'false')
    if (returnFocus) btn.focus()
  }
  const choose = (opt: HTMLLIElement) => {
    options.forEach((o) => o.setAttribute('aria-selected', String(o === opt)))
    if (value) value.textContent = opt.dataset.role ?? ''
    if (aclDesc) aclDesc.textContent = opt.dataset.desc ?? aclDefault
    close(true)
  }

  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null
    if (!target) return
    if (sync && target.closest('[data-sw="sync"]')) return setSync(!sync.classList.contains('is-on'))
    if (target.closest('[data-sw="private"]')) return bouncePrivate()
    if (btn && target.closest('.acl-btn')) return menu?.hidden ? open(event.detail === 0) : close(false)
    const opt = target.closest<HTMLLIElement>('[role="option"]')
    if (opt && options.includes(opt)) choose(opt)
  }
  const onKey = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target === btn && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      event.preventDefault()
      open(true)
      return
    }
    const i = options.indexOf(target as HTMLLIElement)
    if (i === -1) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      options[(i + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length].focus()
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      choose(options[i])
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      close(event.key === 'Escape')
    }
  }
  const onOutside = (event: MouseEvent) => {
    if (!(event.target as Element | null)?.closest('.acl')) close(false)
  }

  card.addEventListener('click', onClick)
  card.addEventListener('keydown', onKey)
  document.addEventListener('click', onOutside)
  return () => {
    window.clearTimeout(lockTimer)
    card.removeEventListener('click', onClick)
    card.removeEventListener('keydown', onKey)
    document.removeEventListener('click', onOutside)
  }
}

/**
 * Mobile FAQ (the old homepage's behaviour): the first five questions plus a "More"
 * button that reveals the rest. CSS limits the collapse and the button to <= 760px,
 * so desktop always lists every question.
 */
function initializeFaq(section: HTMLElement, moreLabel: string) {
  const list = section.querySelector<HTMLElement>('.fq-list')
  if (!list || list.querySelectorAll('details').length <= 5) return () => {}
  list.classList.add('faq-collapsed')
  const more = document.createElement('button')
  more.type = 'button'
  more.className = 'faq-more'
  more.textContent = moreLabel
  more.setAttribute('aria-expanded', 'false')
  more.setAttribute('aria-controls', list.id)
  list.after(more)
  const expand = () => {
    list.classList.remove('faq-collapsed')
    more.setAttribute('aria-expanded', 'true')
    more.hidden = true
    list.querySelectorAll<HTMLElement>('details')[5]?.querySelector('summary')?.focus()
  }
  more.addEventListener('click', expand)
  return () => {
    more.removeEventListener('click', expand)
    more.remove()
    list.classList.remove('faq-collapsed')
  }
}

function initializeStory(story: HTMLElement) {
  const moments = [0, 1, 2, 3].map((i) => story.querySelector<HTMLElement>(`.mom.m${i}`))
  const swap = (prefix: string, value: number, count: number) => {
    for (let i = 0; i < count; i++) story.classList.toggle(`${prefix}${i}`, i === value)
  }
  const markSeen = (i: number) => {
    moments[i]?.classList.add('on')
    story.classList.add(`c${i}`)
    if (i === 3) story.classList.add('c4')
  }

  let io: IntersectionObserver | undefined
  let activeIo: IntersectionObserver | undefined
  if (typeof IntersectionObserver === 'undefined') {
    moments.forEach((_, i) => markSeen(i))
  } else {
    const indexOf = (el: Element) => moments.indexOf(el as HTMLElement)
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && markSeen(indexOf(e.target))),
      { threshold: 0.01 },
    )
    activeIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && swap('act', indexOf(e.target), 4)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    moments.forEach((el) => {
      if (!el) return
      io!.observe(el)
      activeIo!.observe(el)
    })
  }

  // The connectors between the intro, the four moments and the closing pill are SVGs
  // drawn on a 1440-wide viewBox and stretched to the page (preserveAspectRatio=none).
  // The rail they join is fixed at left:111px and the pill is centred, so on any other
  // width the joints drift apart. Redraw each path in real pixels: x <= 140 stays
  // pinned left (on the rail), x >= 692 stays relative to the centre (the pill).
  const DESIGN_W = 1440
  const connectors = Array.from(story.querySelectorAll<SVGPathElement>('.cn svg path')).map((path) => ({
    path,
    svg: path.ownerSVGElement!,
    d: path.getAttribute('d') ?? '',
    h: Number(path.ownerSVGElement!.getAttribute('height')) || 110,
  }))
  const DESIGN_RAIL_X = 112
  const rail = story.querySelector<HTMLElement>('.rail')
  const fitConnectors = () => {
    // The rail moves to the left edge on small screens (mobile.css), so read its
    // actual centre instead of assuming the design's x = 112.
    const railX = rail
      ? rail.getBoundingClientRect().left - story.getBoundingClientRect().left + rail.offsetWidth / 2
      : DESIGN_RAIL_X
    connectors.forEach(({ path, svg, d, h }) => {
      const w = svg.getBoundingClientRect().width
      if (!w) return
      const half = w / 2
      path.setAttribute('d', d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x: string, y: string) => {
        const n = Number(x)
        return `${n >= DESIGN_W / 2 - 28 ? half + (n - DESIGN_W / 2) : n - DESIGN_RAIL_X + railX},${y}`
      }))
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    })
  }
  fitConnectors()
  const ro = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(fitConnectors)
  ro?.observe(story)

  let agent = 0
  let timer: number | undefined
  const showAgent = (i: number) => {
    agent = i
    swap('sc', i, 3)
  }
  const startRotation = () => {
    window.clearInterval(timer)
    timer = window.setInterval(() => showAgent((agent + 1) % 3), AGENT_ROTATE_MS)
  }
  const onClick = (event: MouseEvent) => {
    const tab = (event.target as Element | null)?.closest<HTMLElement>('[data-v16-pc]')
    if (!tab || !story.contains(tab)) return
    showAgent(Number(tab.dataset.v16Pc))
    startRotation()
  }
  story.addEventListener('click', onClick)
  startRotation()

  return () => {
    io?.disconnect()
    activeIo?.disconnect()
    ro?.disconnect()
    window.clearInterval(timer)
    story.removeEventListener('click', onClick)
  }
}
