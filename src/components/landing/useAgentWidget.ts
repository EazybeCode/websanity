'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Bridge to the "Chat with us" agent widget (app.eazybe.com/widget.js, loaded
 * in the locale layout). The widget renders into an open shadow root on a div
 * appended to <body>. While Bea is mounted we hide the widget's own launcher
 * and greeting bubble so there is a single assistant on the page, restyle its
 * chat panel header with Bea's face, and open/close the panel from Bea.
 */

const STYLE_ID = 'bea-widget-bridge'

function findWidget(): { host: HTMLElement; root: ShadowRoot } | null {
  if (typeof document === 'undefined') return null
  for (const el of Array.from(document.body.children)) {
    const root = (el as HTMLElement).shadowRoot
    if (root?.querySelector('.launcher') && root.querySelector('.panel')) return { host: el as HTMLElement, root }
  }
  return null
}

function bridgeCss(faceUrl: string) {
  return `
    .launcher,.greeting{display:none!important}
    .panel{bottom:calc(var(--bea-tile-h,148px) + 14px)!important;height:min(500px,calc(100dvh - var(--bea-tile-h,148px) - 70px))!important;border-radius:16px!important;border-color:#e6e6e3!important;box-shadow:0 24px 60px -20px #0b0b0c47,0 18px 50px #2b59ff1a!important}
    .header .avatar{background:url("${faceUrl}") center 20%/cover!important;border:2px solid #fff!important;box-shadow:0 0 0 1px #e6e6e3}
    .header .avatar>*{display:none!important}
    .header .avatar:before,.header .avatar:after{display:none!important}
  `
}

export function useAgentWidget(faceUrl: string) {
  const [available, setAvailable] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  // Visitor messages that the agent has already answered (a trailing,
  // still-unanswered visitor message is not counted).
  const [answeredTurns, setAnsweredTurns] = useState(0)
  const widgetRef = useRef<{ host: HTMLElement; root: ShadowRoot } | null>(null)

  useEffect(() => {
    let observer: MutationObserver | null = null
    let panelObserver: MutationObserver | null = null
    let historyObserver: MutationObserver | null = null

    const attach = (w: { host: HTMLElement; root: ShadowRoot }) => {
      widgetRef.current = w
      if (!w.root.getElementById(STYLE_ID)) {
        const style = document.createElement('style')
        style.id = STYLE_ID
        style.textContent = bridgeCss(new URL(faceUrl, window.location.origin).href)
        w.root.append(style)
      }
      const panel = w.root.querySelector('.panel') as HTMLElement
      setChatOpen(!panel.hidden)
      panelObserver = new MutationObserver(() => setChatOpen(!panel.hidden))
      panelObserver.observe(panel, { attributes: true, attributeFilter: ['hidden'] })
      const history = w.root.querySelector('.history')
      if (history) {
        const count = () => {
          const bubbles = Array.from(history.querySelectorAll('.bubble'))
          const users = bubbles.filter((b) => b.classList.contains('user')).length
          const lastIsUser = bubbles[bubbles.length - 1]?.classList.contains('user') ?? false
          setAnsweredTurns(lastIsUser ? users - 1 : users)
        }
        count()
        historyObserver = new MutationObserver(count)
        historyObserver.observe(history, { childList: true })
      }
      setAvailable(true)
    }

    const found = findWidget()
    if (found) attach(found)
    else {
      observer = new MutationObserver(() => {
        const w = findWidget()
        if (w) {
          observer?.disconnect()
          observer = null
          attach(w)
        }
      })
      observer.observe(document.body, { childList: true })
    }

    return () => {
      observer?.disconnect()
      panelObserver?.disconnect()
      historyObserver?.disconnect()
      // Bea unmounted (route without her): give the widget its own launcher back.
      widgetRef.current?.root.getElementById(STYLE_ID)?.remove()
      widgetRef.current = null
    }
  }, [faceUrl])

  const openChat = useCallback(() => {
    const w = widgetRef.current
    const panel = w?.root.querySelector('.panel') as HTMLElement | null
    if (!w || !panel) return false
    if (panel.hidden) (w.root.querySelector('.launcher') as HTMLButtonElement | null)?.click()
    return true
  }, [])

  const closeChat = useCallback(() => {
    const w = widgetRef.current
    const panel = w?.root.querySelector('.panel') as HTMLElement | null
    if (panel && !panel.hidden) (w!.root.querySelector('.close') as HTMLButtonElement | null)?.click()
  }, [])

  return { available, chatOpen, answeredTurns, openChat, closeChat }
}
