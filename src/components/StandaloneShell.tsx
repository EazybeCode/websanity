import type { ReactNode } from 'react'
import '@/app/self-hosted-fonts.css'

/**
 * Shared <html>/<body> shell for pages that live outside `[locale]/` — the
 * 404 page, OAuth callbacks, `/fb`, etc. The `[locale]` layout owns its own
 * shell with per-locale `lang`; everything else routes through this shell so
 * each response still ships with a valid `lang` attribute, Tailwind styles,
 * and the same fonts as the main app.
 */
export function StandaloneShell({
  lang = 'en',
  children,
}: {
  lang?: string
  children: ReactNode
}) {
  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <body
        className="font-var-inter font-var-jetbrains-mono font-sans antialiased"
      >
        {children}
      </body>
    </html>
  )
}
