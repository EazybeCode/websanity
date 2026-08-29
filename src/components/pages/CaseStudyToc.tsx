'use client'

import { useEffect, useState } from 'react'

/**
 * Sticky "in this article" navigation with scroll-spy, Salesforce-blog style.
 * Highlights the section currently in view; plain anchor links otherwise, so
 * it degrades to a normal jump list without JavaScript.
 */
export function CaseStudyToc({ title, items }: { title: string; items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // Trigger when a section heading crosses the upper third of the screen.
      { rootMargin: '-90px 0px -65% 0px' },
    )
    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="lka-toc" aria-label={title}>
      <div className="lka-toc-title">{title}</div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={active === item.id ? 'is-active' : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
