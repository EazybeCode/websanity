'use client'

import React, { useEffect } from 'react'
import { decryptParams } from '@/lib/decrypt-params'
import { StandaloneShell } from '@/components/StandaloneShell'

const EXTENSION_ID_PRODUCTION = "aihpfgoknheimieofcfjiobnmddldjeb"
const EXTENSION_ID_LEGACY_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const CLIENT_ID_RAJAT = "1000.77NM4BCO7LABBJ3FKDXGIEIKODXMQI"
const CLIENT_SECRET_RAJAT = "6cc2985329348dc754bfe0b721b5a4a850ef50e330"
const REDIRECT_URI = "https://eazybe.com/integrate-zoho-crm"

type ExtensionResponse = unknown

type BrowserWindow = Window & {
  chrome?: {
    runtime?: {
      sendMessage: (
        extensionId: string,
        message: { key: string },
        callback?: (response: ExtensionResponse) => void
      ) => void
    }
  }
  gtag?: (event: string, eventName: string) => void
  gtagAW?: (event: string, eventName: string) => void
}

const sendMessageToChromeExtension = (
  status: boolean,
  time: number = 10,
  extensionId: string = "aihpfgoknheimieofcfjiobnmddldjeb",
  key?: string
) => {
  setTimeout(() => {
    const browserWindow = window as BrowserWindow

    if (browserWindow.chrome?.runtime) {
      const ids = [extensionId, EXTENSION_ID_PRODUCTION, EXTENSION_ID_LEGACY_PRODUCTION]
        .filter((id, index, arr): id is string => Boolean(id) && arr.indexOf(id) === index)

      ids.forEach((id) => {
        browserWindow.chrome?.runtime?.sendMessage(
          id,
          { key: key ?? "ZOHO_CONNECTED" },
          (response: ExtensionResponse) => { console.log("response:", response) }
        )
      })
    }
  }, time)
}

const getRedirectURI = async (): Promise<string> => {
  try {
    const resp = await fetch("https://cerberus.eazybe.com/prod/api/v1/zoho/scopes")
    const response = await resp.json()
    return `https://accounts.zoho.com/oauth/v2/auth?scope=${response.data.scopes}&client_id=${CLIENT_ID_RAJAT}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URI}`
  } catch {
    return `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.READ,ZohoCRM.modules.ALL,ZohoCRM.settings.profiles.READ,ZohoCRM.settings.fields.ALL,ZohoCRM.org.ALL,ZohoCRM.settings.layouts.ALL,ZohoCRM.settings.map_dependency.READ,ZohoCRM.Files.CREATE,ZohoCRM.Files.READ,WorkDrive.files.CREATE,ZohoCRM.coql.READ&client_id=${CLIENT_ID_RAJAT}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URI}`
  }
}

const getAuthToken = async (workspaceId: string) => {
  const res = await fetch(
    `https://cerberus.eazybe.com/prod/api/v2/auth/token-by-workspace?workspace_id=${workspaceId}`
  )
  const data = await res.json()
  return data?.access_token
}

const getBearerToken = async (
  tempCode: string,
  tempAccountServerUrl: string,
  effectiveAuthToken: string | null
) => {
  if (!tempCode) return
  const workspaceId = localStorage.getItem("workspaceId")

  try {
    const authToken = effectiveAuthToken || (workspaceId ? await getAuthToken(workspaceId) : null)

    const resp = await fetch("https://cerberus.eazybe.com/prod/api/v2/zoho/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({
        temp_account_server_url: tempAccountServerUrl,
        client_id: CLIENT_ID_RAJAT,
        client_secret: CLIENT_SECRET_RAJAT,
        redirect_uri: REDIRECT_URI,
        temp_code: tempCode,
        workspace_id: workspaceId,
      }),
    })
    const response = await resp.json()
    if (resp.ok && response?.result !== false) {
      const browserWindow = window as BrowserWindow
      browserWindow.gtag?.("event", "Zohointegrated")
      browserWindow.gtagAW?.("event", "Zohointegrated")
      sendMessageToChromeExtension(true, 500, localStorage.getItem("extensionId") || undefined)
      setTimeout(() => { window.close() }, 1000)
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

export default function IntegrateZohoCrmPage() {
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

      const savedAuthToken = localStorage.getItem("authToken")
      const effectiveAuthToken = authToken || savedAuthToken

      if (autoConnect) {
        window.location.href = await getRedirectURI()
        return
      }

      if (urlParamsObject?.code) {
        getBearerToken(urlParamsObject.code, urlParamsObject["accounts-server"], effectiveAuthToken)
      }
    }

    extractParams()
  }, [])

  return (
    <StandaloneShell>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Connecting to Zoho CRM...</p>
        </div>
      </div>
    </StandaloneShell>
  )
}
