"use client"

/**
 * Opens the Chrome Web Store in the centered popup-style browser window used by the app.
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
  ].join(",")

  const popup = window.open("about:blank", "_blank", features)

  if (!popup) {
    return window.open(url, "_blank", features)
  }

  popup.opener = null
  popup.location.href = url
  popup.focus()
  return popup
}
