'use client'

import React, { useEffect } from 'react'
import { decryptParams } from '@/lib/decrypt-params'
import { StandaloneShell } from '@/components/StandaloneShell'

const EXTENSION_ID_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const CLIENT_ID_RAJAT = "1000.77NM4BCO7LABBJ3FKDXGIEIKODXMQI"
const CLIENT_SECRET_RAJAT = "6cc2985329348dc754bfe0b721b5a4a850ef50e330"
const REDIRECT_URI = "https://eazybe.com/integrate-zoho-crm"

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
        { key: key ?? "ZOHO_CONNECTED" },
        (response: any) => { console.log("response:", response) }
      )
      ;(window as any).chrome.runtime.sendMessage(
        EXTENSION_ID_PRODUCTION,
        { key: key ?? "ZOHO_CONNECTED" },
        (response: any) => { console.log("response:", response) }
      )
    }
  }, time)
}

const getRedirectURI = async (): Promise<string> => {
  try {
    const resp = await fetch("https://eazybe.com/api/v1/whatzapp/zoho/scopes")
    const response = await resp.json()
    return `https://accounts.zoho.com/oauth/v2/auth?scope=${response.data.scopes}&client_id=${CLIENT_ID_RAJAT}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URI}`
  } catch {
    return `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.READ,ZohoCRM.modules.ALL,ZohoCRM.settings.profiles.READ,ZohoCRM.settings.fields.ALL,ZohoCRM.org.ALL,ZohoCRM.settings.layouts.ALL,ZohoCRM.settings.map_dependency.READ,ZohoCRM.Files.CREATE,ZohoCRM.Files.READ,WorkDrive.files.CREATE,ZohoCRM.coql.READ&client_id=${CLIENT_ID_RAJAT}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URI}`
  }
}

const getBearerToken = async (tempCode: string, tempAccountServerUrl: string) => {
  if (!tempCode) return
  try {
    const resp = await fetch("https://eazybe.com/api/v1/whatzapp/zoho/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        temp_account_server_url: tempAccountServerUrl,
        client_id: CLIENT_ID_RAJAT,
        client_secret: CLIENT_SECRET_RAJAT,
        redirect_uri: REDIRECT_URI,
        temp_code: tempCode,
        workspace_id: localStorage.getItem("workspaceId"),
      }),
    })
    const response = await resp.json()
    if (response?.result) {
      ;(window as any).gtag?.("event", "Zohointegrated")
      ;(window as any).gtagAW?.("event", "Zohointegrated")
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
      const autoConnect = urlParamsObject['connect'] === "true"

      if (workspaceId) localStorage.setItem("workspaceId", workspaceId)
      if (email) localStorage.setItem("email", email)
      if (extensionId) localStorage.setItem("extensionId", extensionId)

      if (autoConnect) {
        window.location.href = await getRedirectURI()
        return
      }

      if (urlParamsObject?.code) {
        getBearerToken(urlParamsObject.code, urlParamsObject["accounts-server"])
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
