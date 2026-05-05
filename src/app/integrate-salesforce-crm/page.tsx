'use client'

import React, { useEffect } from 'react'
import { decryptParams } from '@/lib/decrypt-params'
import { StandaloneShell } from '@/components/StandaloneShell'

const APP_URL_PREFIX_V2 = "https://cerberus.eazybe.com/prod/api/v2/"
const EXTENSION_ID_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const REDIRECT_URI = "https://eazybe.com/integrate-salesforce-crm"
const SALESFORCE_DOMAIN = "login.salesforce"
const RESPONSE_TYPE = "code"
const CLIENT_ID = "3MVG9Kr5_mB04D17phMhLZXqXQ8jQnGDJCGPfV3M5yXC_LoGr1QkZc9sKJ1CSnmvaL5fKkolF5eYh3CU4MrGc"
const clientRedirectURI = `https://${SALESFORCE_DOMAIN}.com/services/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

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

const createAuthSalesforce = (data: { code: string; redirect_uri: string; workspace_id: string | null }): Promise<any> => {
  return new Promise((resolve) => {
    FETCHV2({ method: 'POST', url: 'salesforce/auth', body: JSON.stringify(data) })
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(() => resolve(null))
  })
}

const sendMessageToChromeExtension = (
  status: boolean,
  time: number = 10,
  extensionId: string = "clgficggccelgifppbcaepjdkklfcefd",
  key?: string
) => {
  setTimeout(() => {
    if ((window as any).chrome?.runtime) {
      ;(window as any).chrome.runtime.sendMessage(
        EXTENSION_ID_PRODUCTION,
        { key: key ?? "SALESFORCE_CONNECTED" },
        (response: any) => { console.log("response:", response) }
      )
      ;(window as any).chrome.runtime.sendMessage(
        extensionId,
        { key: key ?? "SALESFORCE_CONNECTED" },
        (response: any) => { console.log("response:", response) }
      )
    }
  }, time)
}

const getBearerToken = async (authCode: string) => {
  const data = {
    code: authCode,
    redirect_uri: REDIRECT_URI,
    workspace_id: localStorage.getItem("workspaceId"),
  }
  const res = await createAuthSalesforce(data)
  if (res?.status) {
    ;(window as any).gtag?.("event", "Salesforceintegrated")
    ;(window as any).gtagAW?.("event", "Salesforceintegrated")
    sendMessageToChromeExtension(true, 500, localStorage.getItem("extensionId") || undefined)
    setTimeout(() => { window.close() }, 1000)
  }
}

export default function IntegrateSalesforceCrmPage() {
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
        window.location.href = clientRedirectURI
        return
      }

      if (urlParamsObject?.code) {
        getBearerToken(urlParamsObject.code)
      }
    }

    extractParams()
  }, [])

  return (
    <StandaloneShell>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Connecting to Salesforce...</p>
        </div>
      </div>
    </StandaloneShell>
  )
}
