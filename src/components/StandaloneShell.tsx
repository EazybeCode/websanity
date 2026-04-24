import { Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

/**
 * Shared <html>/<body> shell for pages that live outside `[locale]/` — the
 * 404 page, OAuth callbacks, `/fb`, etc. The `[locale]` layout owns its own
 * shell with per-locale `lang`; everything else routes through this shell so
 * each response still ships with a valid `lang` attribute, Tailwind styles,
 * and the same fonts as the main app.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
