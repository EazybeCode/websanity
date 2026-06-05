import type { Metadata } from "next"
import "./globals.css"

// `<html>` and `<body>` live in `[locale]/layout.tsx` so the `lang` attribute
// is server-rendered with the correct locale without opting the tree into
// dynamic rendering. This root layout only carries the global `metadata`
// export (favicons, manifest, etc.) and acts as a pass-through wrapper for
// non-locale routes (redirect stub, 404, OAuth callbacks) which render their
// own minimal HTML.
export const metadata: Metadata = {
  metadataBase: new URL("https://eazybe.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
