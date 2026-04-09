import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { headers } from "next/headers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://eazybe.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Eazybe",
    statusBarStyle: "default",
  },
  other: {
    "theme-color": "#020617",
    "X-UA-Compatible": "IE=edge",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || ''

  const langMap: Record<string, string> = {
    '/br': 'pt-BR',
    '/es': 'es',
    '/tr': 'tr',
  }

  let lang = 'en'
  for (const [prefix, locale] of Object.entries(langMap)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      lang = locale
      break
    }
  }

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
