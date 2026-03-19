'use client'

import React, { useEffect } from 'react'

const EXTENSION_ID_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const APP_URL_PREFIX_V2 = "https://api.eazybe.com/v2/"

const sendMessageToChromeExtension = (
  status: boolean,
  time: number = 10,
  extensionId: string = "fpnlneiiaeclcckbcoldjhcpaofgdmfl",
  key?: string
) => {
  setTimeout(() => {
    if ((window as any).chrome?.runtime) {
      ;(window as any).chrome.runtime.sendMessage(
        extensionId,
        { key: key ?? "HUBSPOT_CONNECTED" },
        (response: any) => { console.log("response:", response) }
      )
      ;(window as any).chrome.runtime.sendMessage(
        EXTENSION_ID_PRODUCTION,
        { key: key ?? "HUBSPOT_CONNECTED" },
        (response: any) => { console.log("response:", response) }
      )
    }
  }, time)
}

const FETCHV2 = async (options: { url: string; method?: string; body?: string }) => {
  const authToken = localStorage.getItem('authToken')
  return fetch(APP_URL_PREFIX_V2 + options.url, {
    method: options.method || "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": authToken ? `Bearer ${authToken}` : ""
    },
    body: options.body,
  })
}

const createAuthHubspot = (data: { code: string; redirect_uri: string; workspace_id: string | null }): Promise<any> => {
  return new Promise((resolve) => {
    FETCHV2({ method: 'POST', url: 'hubspot/auth', body: JSON.stringify(data) })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(() => resolve(null))
  })
}

const getBearerToken = async (authCode: string) => {
  const data = {
    code: authCode,
    redirect_uri: "https://eazybe.com/integrate-hubspot-crm",
    workspace_id: localStorage.getItem("workspaceId"),
  }
  const res = await createAuthHubspot(data)
  if (res?.status) {
    ;(window as any).gtag?.("event", "Hubspotintegrated")
    ;(window as any).gtagAW?.("event", "Hubspotintegrated")
    sendMessageToChromeExtension(true, 500, localStorage.getItem("extensionId") || undefined)
    setTimeout(() => { window.close() }, 1000)
  }
}

export default function IntegrateHubspotCrmPage() {
  useEffect(() => {
    const extractParams = async () => {
      const url = new URL(window.location.href)
      const urlParams = new URLSearchParams(url.search)
      const encryptedParams = urlParams.get("params")
      const urlParamsObject: Record<string, string> = {}

      if (encryptedParams) {
        try {
          const response = await fetch("https://api.eazybe.com/v2/other/decrypt-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ encryptedUrl: encryptedParams }),
          })
          if (!response.ok) throw new Error("Failed to decrypt URL")
          const { data } = await response.json()
          new URLSearchParams(data).forEach((value, key) => { urlParamsObject[key] = value })
        } catch (error) {
          console.error("Error decrypting params:", error)
        }
      } else {
        urlParams.forEach((value, key) => { urlParamsObject[key] = value })
      }

      const workspaceId = urlParamsObject['workspaceid'] || null
      const email = urlParamsObject['user_email'] || null
      const extensionId = urlParamsObject['extensionId'] || null
      const authToken = urlParamsObject['authToken'] || null
      const autoConnect = urlParamsObject['connect'] === "true"

      if (workspaceId) localStorage.setItem("workspaceId", workspaceId)
      if (email) localStorage.setItem("email", email)
      if (extensionId) localStorage.setItem("extensionId", extensionId)
      if (authToken) localStorage.setItem("authToken", authToken)

      if (autoConnect) {
        try {
          const resp = await FETCHV2({ url: 'hubspot/url' })
          const result = await resp.json()
          if (result?.data) {
            window.location.href = result.data
            return
          }
        } catch (error) {
          console.error("Error getting HubSpot URL:", error)
        }
      }

      if (urlParamsObject?.code) {
        getBearerToken(urlParamsObject.code)
      }
    }

    extractParams()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Connecting to HubSpot...</p>
      </div>
    </div>
  )
}
