"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"
import {
  INSTALL_REDIRECT_URL,
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
      href={INSTALL_REDIRECT_URL}
      onClick={(event) => {
        event.currentTarget.href = withIncomingTrackingParams(INSTALL_REDIRECT_URL)
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
