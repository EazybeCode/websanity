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
