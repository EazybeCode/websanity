"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"
import {
  CHROME_STORE_WEBSITE_URL,
  withIncomingTrackingParams,
} from "@/utils/openChromeExtensionStore"

type TrackedChromeStoreLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode
}

export function TrackedChromeStoreLink({
  children,
  onClick,
  ...props
}: TrackedChromeStoreLinkProps) {
  return (
    <a
      {...props}
      href={CHROME_STORE_WEBSITE_URL}
      onClick={(event) => {
        event.currentTarget.href = withIncomingTrackingParams(CHROME_STORE_WEBSITE_URL)
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
