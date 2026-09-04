'use client'

import React, { useEffect, useRef, useState } from 'react'
import { decryptParams } from '@/lib/decrypt-params'
import { StandaloneShell } from '@/components/StandaloneShell'

const CLIENT_ID = "app.6448e61fad4676.49982309"
const EXTENSION_ID_PRODUCTION = "aihpfgoknheimieofcfjiobnmddldjeb"
const EXTENSION_ID_LEGACY_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const REDIRECT_URI = "https://eazybe.com/integrate-bitrix-crm"
const BITRIX_MARKETPLACE_SOURCE = "bitrix_marketplace"
const BITRIX_MARKETPLACE_CONTEXT_KEY = "eazybe_bitrix_marketplace_return_url"
const BITRIX_MARKETPLACE_CONTEXT_TTL_MS = 15 * 60 * 1000
const ALLOWED_WORKSPACE_ORIGINS = new Set([
  "https://dev-app.eazybe.com",
  "https://app.eazybe.com",
])

const getMarketplaceReturnURL = (candidate?: string | null): string | null => {
  if (!candidate) return null

  try {
    const url = new URL(candidate)
    if (!ALLOWED_WORKSPACE_ORIGINS.has(url.origin)) return null

    url.pathname = "/integrations"
    url.search = ""
    url.hash = ""
    url.searchParams.set("section", "bitrix24")
    url.searchParams.set("source", BITRIX_MARKETPLACE_SOURCE)
    return url.toString()
  } catch {
    return null
  }
}

type MarketplaceContext = {
  returnURL: string
  state: string
  createdAt: number
}

const createMarketplaceState = (): string => {
  const nonce = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
  return `${BITRIX_MARKETPLACE_SOURCE}.${nonce}`
}

const readMarketplaceReturnURL = (callbackState?: string): string | null => {
  const storedContext = localStorage.getItem(BITRIX_MARKETPLACE_CONTEXT_KEY)
  if (!storedContext) return null

  try {
    const context = JSON.parse(storedContext) as MarketplaceContext
    const returnURL = getMarketplaceReturnURL(context.returnURL)
    const isExpired = Date.now() - context.createdAt > BITRIX_MARKETPLACE_CONTEXT_TTL_MS
    if (!returnURL || isExpired || !callbackState || context.state !== callbackState) {
      localStorage.removeItem(BITRIX_MARKETPLACE_CONTEXT_KEY)
      return null
    }
    return returnURL
  } catch {
    // Keep callbacks already started before this change working.
    return callbackState === BITRIX_MARKETPLACE_SOURCE
      ? getMarketplaceReturnURL(storedContext)
      : null
  }
}

const saveMarketplaceReturnURL = (explicitReturnURL?: string | null): MarketplaceContext | null => {
  const returnURL =
    getMarketplaceReturnURL(explicitReturnURL) ||
    getMarketplaceReturnURL(document.referrer)

  if (returnURL) {
    const context = {
      returnURL,
      state: createMarketplaceState(),
      createdAt: Date.now(),
    }
    localStorage.setItem(BITRIX_MARKETPLACE_CONTEXT_KEY, JSON.stringify(context))
    return context
  }
  return null
}

const redirectMarketplaceCallbackToWorkspace = (
  returnURL: string,
  callbackParams: Record<string, string>
) => {
  const workspaceURL = new URL(returnURL)
  const forwardedParams = [
    "code",
    "domain",
    "member_id",
    "scope",
    "server_domain",
  ]

  forwardedParams.forEach((key) => {
    const value = callbackParams[key]
    if (value) workspaceURL.searchParams.set(key, value)
  })
  localStorage.removeItem(BITRIX_MARKETPLACE_CONTEXT_KEY)
  window.location.replace(workspaceURL.toString())
}

const getClientRedirectURL = (marketplaceState?: string): string | null => {
  const domain = localStorage.getItem("bitrixDomain")
  if (!domain) return null
  const url = new URL(`https://${domain}/oauth/authorize/`)
  url.searchParams.set("client_id", CLIENT_ID)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("redirect_uri", REDIRECT_URI)
  if (marketplaceState) url.searchParams.set("state", marketplaceState)
  return url.toString()
}

const sendMessageToChromeExtension = () => {
  const localExtensionId = localStorage.getItem("extensionId")
  if (!(window as any).chrome?.runtime) return

  setTimeout(() => {
    const message = { key: "BITRIX_CONNECTED" }
    const ids = [localExtensionId, EXTENSION_ID_PRODUCTION, EXTENSION_ID_LEGACY_PRODUCTION]
      .filter((id, index, arr): id is string => Boolean(id) && arr.indexOf(id) === index)
    ids.forEach((id) => {
      ;(window as any).chrome.runtime.sendMessage(id, message, (response: any) => {
        console.log("response:", response)
      })
    })
  }, 500)
}

const saveBitrixToken = async (accessToken: string, refreshToken: string, endpoint: string, expires: number) => {
  try {
    const response = await fetch("https://cerberus.eazybe.com/prod/api/v1/bitrix/createauth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        workspace_id: localStorage.getItem("workspaceId"),
        access_token: accessToken,
        refresh_token: refreshToken,
        client_endpoint: endpoint,
        expires,
      }),
    })
    const data = await response.json()
    if (data?.result) {
      ;(window as any).gtag?.("event", "Bitrixintegrated")
      ;(window as any).gtagAW?.("event", "Bitrixintegrated")
      sendMessageToChromeExtension()
      setTimeout(() => window.close(), 1000)
    }
  } catch (error) {
    console.error("Error saving Bitrix token:", error)
  }
}

const getBearerToken = async (authCode: string) => {
  try {
    const response = await fetch(
      `https://cerberus.eazybe.com/prod/api/v1/bitrix/authentication?client_id=${CLIENT_ID}&code=${authCode}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`
    )
    const res = await response.json()
    const { data } = res || {}
    if (data?.access_token && data?.refresh_token && data?.client_endpoint) {
      await saveBitrixToken(data.access_token, data.refresh_token, data.client_endpoint, data.expires)
    }
  } catch (error) {
    console.error("Error getting bearer token:", error)
  }
}

export default function IntegrateBitrixCrmPage() {
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const hasStartedConnection = useRef(false)

  useEffect(() => {
    if (hasStartedConnection.current) return
    hasStartedConnection.current = true

    const extractParams = async () => {
      const url = new URL(window.location.href)
      const urlParams = new URLSearchParams(url.search)
      const encryptedParams = urlParams.get("params")
      const urlParamsObject: Record<string, string> = {}

      if (encryptedParams) {
        try {
          const decrypted = decryptParams(encryptedParams)
          Object.assign(urlParamsObject, decrypted)
        } catch (error) {
          console.error("Error decrypting params:", error)
        }
      } else {
        urlParams.forEach((value, key) => { urlParamsObject[key] = value })
      }

      const workspaceId = urlParamsObject["workspaceid"] || null
      const email = urlParamsObject["user_email"] || null
      const extensionId = urlParamsObject["extensionId"] || null
      const authToken = urlParamsObject["authToken"] || null
      const bitrixDomain = urlParamsObject["domain"] || localStorage.getItem("bitrixDomain") || null
      const autoConnect = urlParamsObject["connect"] === "true"
      const isMarketplaceEntry = urlParamsObject["source"] === BITRIX_MARKETPLACE_SOURCE
      const callbackState = urlParamsObject["state"]
      const isMarketplaceCallback =
        isMarketplaceEntry ||
        callbackState === BITRIX_MARKETPLACE_SOURCE ||
        callbackState?.startsWith(`${BITRIX_MARKETPLACE_SOURCE}.`)

      if (workspaceId) localStorage.setItem("workspaceId", workspaceId)
      if (email) localStorage.setItem("email", email)
      if (extensionId) localStorage.setItem("extensionId", extensionId)
      if (authToken) localStorage.setItem("authToken", authToken)
      if (bitrixDomain) localStorage.setItem("bitrixDomain", bitrixDomain)
      const marketplaceContext = isMarketplaceEntry
        ? saveMarketplaceReturnURL(urlParamsObject["return_url"])
        : null

      if (autoConnect && bitrixDomain) {
        if (isMarketplaceEntry && !marketplaceContext) {
          setConnectionError("Unable to return to Eazybe. Please restart the connection from your workspace.")
          return
        }
        const redirectURL = getClientRedirectURL(marketplaceContext?.state)
        if (redirectURL) {
          window.location.href = redirectURL
          return
        }
      }

      if (urlParamsObject?.code) {
        const marketplaceReturnURL = isMarketplaceCallback
          ? readMarketplaceReturnURL(callbackState)
          : null
        if (marketplaceReturnURL) {
          redirectMarketplaceCallbackToWorkspace(marketplaceReturnURL, urlParamsObject)
          return
        }
        if (isMarketplaceCallback) {
          setConnectionError("Your Bitrix24 connection session expired. Please return to Eazybe and try again.")
          return
        }
        await getBearerToken(urlParamsObject.code)
      }
    }

    extractParams()
  }, [])

  return (
    <StandaloneShell>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          {!connectionError && (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          )}
          <p className="text-white text-lg">
            {connectionError || "Connecting to Bitrix24..."}
          </p>
        </div>
      </div>
    </StandaloneShell>
  )
}
