'use client'

import { useEffect, useState } from 'react'

/** Sticky section tabs for /calling. Plain anchor links, so they work without JS; JS only marks the active one. */
export function CallingHubTabs({ tabs, ariaLabel }: { tabs: { id: string; n: string; label: string }[]; ariaLabel: string }) {
  const [active, setActive] = useState(tabs[0]?.id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      // Only the band around the upper-middle of the screen counts as "current".
      { rootMargin: '-35% 0px -55% 0px' },
    )
    tabs.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [tabs])

  return (
    <nav className="ch-tabs" aria-label={ariaLabel}>
      {tabs.map((t) => (
        <a key={t.id} href={`#${t.id}`} className={t.id === active ? 'is-active' : undefined} aria-current={t.id === active ? 'true' : undefined}>
          <span>{t.n}</span> {t.label}
        </a>
      ))}
    </nav>
  )
}
