'use client'

import React, { useEffect } from 'react'
import { decryptParams } from '@/lib/decrypt-params'
import { StandaloneShell } from '@/components/StandaloneShell'

const CLIENT_ID = "app.6448e61fad4676.49982309"
const EXTENSION_ID_PRODUCTION = "aihpfgoknheimieofcfjiobnmddldjeb"
const EXTENSION_ID_LEGACY_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const REDIRECT_URI = "https://eazybe.com/integrate-bitrix-crm"

const getClientRedirectURL = (): string | null => {
  const domain = localStorage.getItem("bitrixDomain")
  if (!domain) return null
  return `https://${domain}/oauth/authorize/?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`
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
  useEffect(() => {
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

      if (workspaceId) localStorage.setItem("workspaceId", workspaceId)
      if (email) localStorage.setItem("email", email)
      if (extensionId) localStorage.setItem("extensionId", extensionId)
      if (authToken) localStorage.setItem("authToken", authToken)
      if (bitrixDomain) localStorage.setItem("bitrixDomain", bitrixDomain)

      if (autoConnect && bitrixDomain) {
        const redirectURL = getClientRedirectURL()
        if (redirectURL) {
          window.location.href = redirectURL
          return
        }
      }

      if (urlParamsObject?.code) {
        await getBearerToken(urlParamsObject.code)
      }
    }

    extractParams()
  }, [])

  return (
    <StandaloneShell>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Connecting to Bitrix24...</p>
        </div>
      </div>
    </StandaloneShell>
  )
}
