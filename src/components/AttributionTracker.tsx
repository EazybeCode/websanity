"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { captureIncomingTrackingParams } from "@/utils/openChromeExtensionStore"

export function AttributionTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    captureIncomingTrackingParams()
  }, [searchParams])

  return null
}
