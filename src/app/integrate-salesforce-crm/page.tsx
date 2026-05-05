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

const FETCHV2 = async (options: { url: string; method?: string; body?: string; authToken?: string }) => {
  return fetch(APP_URL_PREFIX_V2 + options.url, {
    method: options.method || "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": options.authToken ? `Bearer ${options.authToken}` : ""
    },
    body: options.body,
  })
}

const fetchAuthTokenByWorkspaceId = async (workspaceId: string): Promise<string | null> => {
  try {
    const response = await FETCHV2({
      url: `auth/token-by-workspace?workspace_id=${encodeURIComponent(workspaceId)}`,
    })
    const data = await response.json()
    return data?.access_token || null
  } catch {
    return null
  }
}

const createAuthSalesforce = (
  data: { code: string; redirect_uri: string; workspace_id: string | null },
  authToken: string
): Promise<any> => {
  return new Promise((resolve) => {
    FETCHV2({ method: 'POST', url: 'salesforce/auth', body: JSON.stringify(data), authToken })
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

const getBearerToken = async (
  authCode: string,
  workspaceId: string | null,
  extensionId: string | null,
  authTokenFromParams: string | null
) => {
  if (!workspaceId) return

  const authToken = authTokenFromParams || await fetchAuthTokenByWorkspaceId(workspaceId)
  if (!authToken) return

  const data = {
    code: authCode,
    redirect_uri: REDIRECT_URI,
    workspace_id: workspaceId,
  }
  const res = await createAuthSalesforce(data, authToken)
  if (res?.status) {
    ;(window as any).gtag?.("event", "Salesforceintegrated")
    ;(window as any).gtagAW?.("event", "Salesforceintegrated")
    sendMessageToChromeExtension(true, 500, extensionId || undefined)
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
      const savedWorkspaceId = localStorage.getItem("workspaceId")
      const savedExtensionId = localStorage.getItem("extensionId")
      const effectiveWorkspaceId = workspaceId || savedWorkspaceId
      const effectiveExtensionId = extensionId || savedExtensionId

      // Always use fresh params from URL, clear old data if new params are present
      if (workspaceId) {
        localStorage.setItem("workspaceId", workspaceId)
      } else {
        localStorage.removeItem("workspaceId")
      }
      if (email) {
        localStorage.setItem("email", email)
      } else {
        localStorage.removeItem("email")
      }
      if (extensionId) {
        localStorage.setItem("extensionId", extensionId)
      } else {
        localStorage.removeItem("extensionId")
      }
      localStorage.removeItem("authToken")

      if (autoConnect) {
        window.location.href = clientRedirectURI
        return
      }

      if (urlParamsObject?.code) {
        getBearerToken(urlParamsObject.code, effectiveWorkspaceId, effectiveExtensionId, authToken)
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
