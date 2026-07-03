"use client"

const CHROME_STORE_BASE_URL =
  "https://chromewebstore.google.com/detail/whatsapp-ai-agents-with-c/clgficggccelgifppbcaepjdkklfcefd"

export const CHROME_STORE_WEBSITE_URL = `${CHROME_STORE_BASE_URL}?utm_medium=Organic&utm_source=website&utm_campaign=eazybe%20workspace`
export const CHROME_STORE_WEBSITE_FORM_URL = `${CHROME_STORE_BASE_URL}?utm_medium=Organic&utm_source=website-form&utm_campaign=eazybe%20workspace`

const TRACKING_PARAM_PREFIXES = ["utm_"]
const TRACKING_PARAM_NAMES = ["gclid", "fbclid", "li_fat_id"]
const ATTRIBUTION_STORAGE_KEY = "eazybe_attribution_params"
const ATTRIBUTION_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

type StoredAttribution = {
  params: Record<string, string>
  expiresAt: number
}

function getTrackingParamsFromSearch(search: string): URLSearchParams {
  const params = new URLSearchParams()

  const currentParams = new URLSearchParams(search)
  currentParams.forEach((value, key) => {
    if (TRACKING_PARAM_PREFIXES.some((prefix) => key.startsWith(prefix)) || TRACKING_PARAM_NAMES.includes(key)) {
      params.set(key, value)
    }
  })

  return params
}

function readStoredTrackingParams(): URLSearchParams {
  const params = new URLSearchParams()

  if (typeof window === "undefined") {
    return params
  }

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return params

    const stored = JSON.parse(raw) as StoredAttribution
    if (!stored.expiresAt || stored.expiresAt < Date.now()) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
      return params
    }

    Object.entries(stored.params || {}).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
  } catch {
    return params
  }

  return params
}

function writeStoredTrackingParams(params: URLSearchParams) {
  if (typeof window === "undefined" || params.size === 0) {
    return
  }

  const storedParams: Record<string, string> = {}
  params.forEach((value, key) => {
    storedParams[key] = value
  })

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify({
        params: storedParams,
        expiresAt: Date.now() + ATTRIBUTION_MAX_AGE_MS,
      } satisfies StoredAttribution),
    )
  } catch {
    // Attribution persistence is best-effort only.
  }
}

export function captureIncomingTrackingParams() {
  if (typeof window === "undefined") {
    return
  }

  const params = getTrackingParamsFromSearch(window.location.search)
  if (params.size === 0) {
    return
  }

  writeStoredTrackingParams(params)

  params.forEach((value, key) => {
    try {
      window.sessionStorage.setItem(key, value)
    } catch {
      // Session persistence is best-effort only.
    }
  })
}

function getIncomingTrackingParams(): URLSearchParams {
  const params = new URLSearchParams()

  if (typeof window === "undefined") {
    return params
  }

  const storedParams = readStoredTrackingParams()
  const currentParams = getTrackingParamsFromSearch(window.location.search)

  storedParams.forEach((value, key) => {
    params.set(key, value)
  })

  currentParams.forEach((value, key) => {
    params.set(key, value)
  })

  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    if (!params.has(key)) {
      const value = (() => {
        try {
          return window.sessionStorage.getItem(key)
        } catch {
          return null
        }
      })()
      if (value) params.set(key, value)
    }
  }

  return params
}

export function withIncomingTrackingParams(url: string): string {
  if (typeof window === "undefined") {
    return url
  }

  const finalUrl = new URL(url, window.location.origin)
  const incomingParams = getIncomingTrackingParams()

  incomingParams.forEach((value, key) => {
    finalUrl.searchParams.set(key, value)
  })

  return finalUrl.toString()
}

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

  const popup = window.open(withIncomingTrackingParams(url), "_blank", features)
  if (popup) {
    popup.focus()
  }
  return popup
}
