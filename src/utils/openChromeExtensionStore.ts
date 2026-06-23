"use client"

/**
 * Opens the Chrome Web Store in a centered popup-style browser window.
 *
 * Single-step open: we go straight to `url` with `window.open(url, ...)`
 * instead of the older about:blank → set location.href dance. The older
 * pattern was leaving the popup stranded on the opener's origin under
 * some dev / cross-origin conditions (e.g. dev server intercepting the
 * navigation, resulting in localhost:3000/signin instead of the target).
 */
export function openChromeExtensionStorePopup(url: string): Window | null {
  if (typeof window === "undefined") {
    return null
  }

  const width = 1100
  const height = 760
  const left = Math.max(0, Math.floor((window.screen.width - width) / 2))
  const top = Math.max(0, Math.floor((window.screen.height - height) / 2))
  const features = [
    "popup=yes",
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    "resizable=yes",
    "scrollbars=yes",
    "toolbar=no",
    "menubar=no",
    "status=no",
    "noopener",
  ].join(",")

  const popup = window.open(url, "_blank", features)
  if (popup) {
    popup.focus()
  }
  return popup
}
