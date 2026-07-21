"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { captureIncomingTrackingParams } from "@/utils/openChromeExtensionStore"

export function AttributionTracker() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    captureIncomingTrackingParams()
  }, [searchParams])

  // Session-journey tracking so HubSpot submissions carry the visitor's
  // real entry/exit pages instead of the submit-time URL.
  // - entryPage: FIRST page the visitor landed on. Written once, never
  //   overwritten, so it stays the true landing URL for their journey.
  // - exitPage: LAST page they were on. Overwritten on every route change,
  //   so at submit time it reflects the page they were viewing.
  // Both live in localStorage under the exact keys getHubSpotAttributionFields
  // already reads (see src/utils/openChromeExtensionStore.ts).
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return
    try {
      if (!window.localStorage.getItem("entryPage")) {
        window.localStorage.setItem("entryPage", pathname)
      }
      window.localStorage.setItem("exitPage", pathname)
    } catch {
      // Storage is best-effort; ignore quota / privacy-mode errors.
    }
  }, [pathname])

  return null
}
