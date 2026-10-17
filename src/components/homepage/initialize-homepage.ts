import { runApprovedInteractions } from './approved-interactions'

/** Own every listener, observer and animation so client navigation/StrictMode is safe. */
export function initializeHomepage(root: HTMLElement, dictionary: Record<string, string> = {}) {
  const translate = (text: string) => dictionary[text] ?? text
  const controller = new AbortController()
  const observers: Array<{ disconnect(): void }> = []
  const frames = new Set<number>()
  const timers = new Set<number>()
  const removers: Array<() => void> = []
  let disposed = false

  const listen = (target: EventTarget, type: string, callback: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean) => {
    target.addEventListener(type, callback, options)
    removers.push(() => target.removeEventListener(type, callback, options))
  }
  const requestFrame = (callback: FrameRequestCallback) => {
    if (disposed) return 0
    const id = window.requestAnimationFrame((now) => { frames.delete(id); if (!disposed) callback(now) })
    frames.add(id)
    return id
  }
  const timeout = (callback: () => void, delay?: number) => {
    const id = window.setTimeout(() => { timers.delete(id); if (!disposed) callback() }, delay)
    timers.add(id)
    return id
  }
  class OwnedIntersectionObserver extends IntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      super(callback, options); observers.push(this)
    }
  }
  class OwnedMutationObserver extends MutationObserver {
    constructor(callback: MutationCallback) { super(callback); observers.push(this) }
  }
  // The imported content scripts cannot query or mutate the site's footer/modals.
  const scopedDocument = {
    querySelector: (selector: string) => root.querySelector(selector),
    querySelectorAll: (selector: string) => root.querySelectorAll(selector),
    getElementById: (id: string) => root.querySelector(`#${CSS.escape(id)}`),
    createElement: document.createElement.bind(document),
    body: root,
    documentElement: root,
    get hidden() { return document.hidden },
    addEventListener: (type: string, callback: EventListenerOrEventListenerObject) => listen(document, type, callback),
    removeEventListener: document.removeEventListener.bind(document),
  }

  runApprovedInteractions({
    translate,
    document: scopedDocument,
    window,
    IntersectionObserver: OwnedIntersectionObserver,
    MutationObserver: OwnedMutationObserver,
    requestAnimationFrame: requestFrame,
    setTimeout: timeout,
    clearTimeout: window.clearTimeout.bind(window),
    matchMedia: window.matchMedia.bind(window),
    addEventListener: (type: string, callback: EventListener, options?: AddEventListenerOptions) => listen(window, type, callback, options),
    listen,
  })

  const nativeNav = document.querySelector<HTMLElement>('.approved-site-nav .nav')
  const navHost = document.querySelector('.approved-site-nav')
  const footer = document.querySelector('.approved-site-footer')
  const subnav = root.querySelector<HTMLElement>('.section-nav')
  const hero = root.querySelector('#home')
  const firstSection = root.querySelector('#phones')
  const navLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('.section-nav a'))
  let pending = false
  const update = () => {
    pending = false
    const bottom = nativeNav?.getBoundingClientRect().bottom ?? 76
    root.style.setProperty('--subnav-top', `${bottom}px`)
    root.style.setProperty('--nav212-height', `${bottom}px`)
    navHost?.classList.toggle('is-past-hero', (hero?.getBoundingClientRect().bottom ?? 0) <= bottom)
    if (subnav && firstSection) subnav.hidden = firstSection.getBoundingClientRect().top > bottom + 16 || (footer?.getBoundingClientRect().top ?? Infinity) < bottom + 65
  }
  const schedule = () => { if (!pending) { pending = true; requestFrame(update) } }
  listen(window, 'scroll', schedule, { passive: true })
  listen(window, 'resize', schedule)
  listen(window, 'hashchange', schedule)
  const resize = new ResizeObserver(schedule)
  observers.push(resize)
  if (nativeNav) resize.observe(nativeNav)
  const sectionObserver = new OwnedIntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) navLinks.forEach((link) => {
      const active = link.hash === `#${entry.target.id}`
      link.classList.toggle('active', active)
      if (active) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
  }, { rootMargin: '-20% 0px -55% 0px' })
  navLinks.forEach((link) => { const target = root.querySelector(link.hash); if (target) sectionObserver.observe(target) })
  const motion = root.querySelector<HTMLButtonElement>('.motion-control')
  if (motion) listen(motion, 'click', () => {
    const paused = root.classList.toggle('paused')
    motion.textContent = translate(paused ? 'Play motion' : 'Pause motion')
    motion.setAttribute('aria-pressed', String(paused))
  })
  // Mobile accordion for the Conversation Management stories (#phones): on small
  // screens each sidebar link reveals its article (visual + copy) directly below
  // itself instead of the four blocks rendering as one long stacked column.
  const phonesLayout = root.querySelector<HTMLElement>('#phones .m221-scroll-layout')
  if (phonesLayout) {
    const storyLinks = Array.from(phonesLayout.querySelectorAll<HTMLAnchorElement>('.m221-sidebar nav a'))
    const rowsHost = phonesLayout.querySelector<HTMLElement>('.m221-rows')
    const storyRows = storyLinks.map((link) => root.querySelector<HTMLElement>(link.hash)).filter((r): r is HTMLElement => !!r)
    const accordionMq = window.matchMedia('(max-width: 760px)')
    let accordionOn = false
    const setOpenStory = (index: number) => {
      storyLinks.forEach((link, i) => {
        link.classList.toggle('m221-acc-open', i === index)
        link.setAttribute('aria-expanded', String(i === index))
        storyRows[i]?.classList.toggle('m221-acc-visible', i === index)
      })
    }
    const enableAccordion = () => {
      if (accordionOn || storyRows.length !== storyLinks.length) return
      accordionOn = true
      phonesLayout.classList.add('m221-accordion')
      storyLinks.forEach((link, i) => link.after(storyRows[i]))
      setOpenStory(0)
    }
    const disableAccordion = () => {
      if (!accordionOn) return
      accordionOn = false
      phonesLayout.classList.remove('m221-accordion')
      storyRows.forEach((row) => {
        row.classList.remove('m221-acc-visible')
        rowsHost?.appendChild(row)
      })
      storyLinks.forEach((link) => { link.classList.remove('m221-acc-open'); link.removeAttribute('aria-expanded') })
    }
    // Auto-advance like the outreach chapters ("01 / Your number, upgraded"):
    // while the section is on screen, the open story moves to the next one every
    // 7s, with a progress line filling under the open title so the cycling is
    // legible. A manual tap selects that story and restarts the clock. Paused
    // when off-screen, tab hidden, on "Pause motion" and reduced motion.
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    let accordionVisible = false
    let storyElapsed = 0
    const progressBars = storyLinks.map((link) => {
      const track = document.createElement('span')
      track.className = 'm221-acc-progress'
      track.setAttribute('aria-hidden', 'true')
      const fill = document.createElement('i')
      track.appendChild(fill)
      link.appendChild(track)
      return fill
    })
    const resetProgress = () => { storyElapsed = 0; progressBars.forEach((bar) => { bar.style.transform = 'scaleX(0)' }) }
    const openStoryAndReset = (index: number) => { setOpenStory(index); resetProgress() }
    let previousTick = 0
    const storyTick = (now: number) => {
      requestFrame(storyTick)
      const dt = previousTick ? Math.min(now - previousTick, 100) : 0
      previousTick = now
      if (!accordionOn || !accordionVisible || document.hidden || reducedMotionMq.matches || root.classList.contains('paused')) return
      const current = storyLinks.findIndex((link) => link.classList.contains('m221-acc-open'))
      if (current === -1) return
      storyElapsed = Math.min(7000, storyElapsed + dt)
      progressBars[current].style.transform = `scaleX(${storyElapsed / 7000})`
      if (storyElapsed >= 7000) openStoryAndReset((current + 1) % storyLinks.length)
    }
    requestFrame(storyTick)
    const visibilityObserver = new OwnedIntersectionObserver((entries) => {
      accordionVisible = entries[0].isIntersecting
    }, { threshold: 0.15 })
    visibilityObserver.observe(phonesLayout)
    const applyAccordionMq = () => {
      if (accordionMq.matches) enableAccordion()
      else disableAccordion()
      resetProgress()
    }
    listen(accordionMq, 'change', applyAccordionMq)
    removers.push(disableAccordion)
    applyAccordionMq()
    // Capture phase so the global smooth-scroll anchor handler below never runs
    // for these links while the accordion is active.
    listen(phonesLayout, 'click', ((event: MouseEvent) => {
      if (!accordionOn) return
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('.m221-sidebar nav a') : null
      if (!link) return
      event.preventDefault()
      event.stopPropagation()
      openStoryAndReset(storyLinks.indexOf(link))
    }) as EventListener, { capture: true })
  }

  // Mobile: in each Outreach chapter (#automation), show the visual for the open
  // story point directly below that point instead of after all three. The points
  // keep their own toggle / auto-advance / progress (approved-interactions); this
  // only follows the "active" class and moves the visual stage under it. Desktop
  // keeps the original side-by-side layout (DOM restored above 760px).
  const outreachSections = Array.from(root.querySelectorAll<HTMLElement>('#automation .outreach-section'))
  if (outreachSections.length) {
    const pointsMq = window.matchMedia('(max-width: 760px)')
    const stages = outreachSections.map((section) => {
      const visual = section.querySelector<HTMLElement>('.outreach-visual')
      const points = Array.from(section.querySelectorAll<HTMLElement>('.outreach-story-point'))
      return visual && points.length ? { visual, points, home: visual.parentElement!, next: visual.nextSibling } : null
    }).filter((s): s is NonNullable<typeof s> => !!s)
    let pointsOn = false
    const place = (stage: (typeof stages)[number]) => {
      const active = stage.points.find((point) => point.classList.contains('active')) || stage.points[0]
      if (stage.visual.previousElementSibling === active) return
      active.after(stage.visual)
      stage.visual.classList.remove('opoint-enter')
      void stage.visual.offsetWidth
      stage.visual.classList.add('opoint-enter')
    }
    const enablePoints = () => {
      if (pointsOn) return
      pointsOn = true
      root.querySelector('#automation')?.classList.add('opoint-mobile')
      stages.forEach(place)
    }
    const disablePoints = () => {
      if (!pointsOn) return
      pointsOn = false
      root.querySelector('#automation')?.classList.remove('opoint-mobile')
      stages.forEach((stage) => {
        stage.visual.classList.remove('opoint-enter')
        stage.home.insertBefore(stage.visual, stage.next)
      })
    }
    const activeWatcher = new OwnedMutationObserver((mutations) => {
      if (!pointsOn) return
      const touched = new Set(mutations.map((m) => (m.target as HTMLElement).closest('.outreach-section')))
      stages.forEach((stage) => { if (touched.has(stage.points[0].closest('.outreach-section'))) place(stage) })
    })
    stages.forEach((stage) => stage.points.forEach((point) => activeWatcher.observe(point, { attributes: true, attributeFilter: ['class'] })))
    const applyPointsMq = () => (pointsMq.matches ? enablePoints() : disablePoints())
    listen(pointsMq, 'change', applyPointsMq)
    removers.push(disablePoints)
    applyPointsMq()
  }

  // Native anchor navigation avoids the prototype's shadow-root dependency.
  listen(root, 'click', ((event: MouseEvent) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
    if (!link || link.hash.length < 2) return
    const target = root.querySelector(link.hash)
    if (!target) return
    event.preventDefault()
    history.replaceState(null, '', link.hash)
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }) as EventListener, { signal: controller.signal })
  update()

  return () => {
    disposed = true
    controller.abort()
    observers.forEach((observer) => observer.disconnect())
    frames.forEach(window.cancelAnimationFrame)
    timers.forEach(window.clearTimeout)
    removers.forEach((remove) => remove())
    navHost?.classList.remove('is-past-hero')
  }
}
