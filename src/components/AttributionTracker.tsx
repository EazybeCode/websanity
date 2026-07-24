"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { captureIncomingTrackingParams, captureWebsitePageAttribution } from "@/utils/openChromeExtensionStore"

export function AttributionTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureIncomingTrackingParams()
    captureWebsitePageAttribution(pathname)
  }, [pathname, searchParams])

  return null
}
