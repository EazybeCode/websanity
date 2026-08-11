/**
 * Marks a block to be revealed when it scrolls into view.
 *
 * Deliberately NOT a client component. An earlier version used a React
 * `useEffect` + IntersectionObserver, which meant the content stayed at
 * opacity 0 until hydration finished — on a slow device that is a blank
 * landing page you are paying for clicks on. The observer now lives in a
 * tiny inline script at the end of <body> (see layout.tsx), so it runs at
 * parse time, ships no component JS, and never waits for React.
 */
export default function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-wc-reveal
      className={`wc-reveal ${className}`}
      // The observer stamps data-in on this element before React hydrates, so
      // React sees an attribute the server never sent. That is intentional —
      // deferring the mark until after hydration is what left the page blank
      // on slow devices. This is the documented escape hatch for an element
      // mutated outside React, and it is scoped to this div's attributes only,
      // never its children.
      suppressHydrationWarning
    >
      {children}
    </div>
  )
}
