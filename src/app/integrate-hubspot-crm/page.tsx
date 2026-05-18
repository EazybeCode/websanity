'use client'

import React, { useEffect } from 'react'
import { decryptParams } from '@/lib/decrypt-params'
import { StandaloneShell } from '@/components/StandaloneShell'

const EXTENSION_ID_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const clientId = 'afc8d801-b77d-43db-a963-6a6993568749'
const clientSecret = '46e6a98e-6072-4385-a481-0de345d6f5e3'
const redirectUri = 'https://eazybe.com/integrate-hubspot-crm'
const scopes = ['crm.objects.contacts.read']
const optionalScopes = [
  'automation',
  'crm.lists.read',
  'crm.lists.write',
  'crm.objects.companies.read',
  'crm.objects.companies.write',
  'crm.objects.contacts.read',
  'crm.objects.contacts.write',
  'crm.schemas.companies.read',
  'crm.schemas.companies.write',
  'crm.schemas.contacts.read',
  'crm.schemas.contacts.write',
  'crm.schemas.deals.read',
  'crm.schemas.deals.write',
  'files',
  'files.ui_hidden.read',
  'tickets',
  'timeline',
  'crm.objects.deals.read',
  'crm.objects.deals.write',
  'crm.objects.owners.read',
  'analytics.behavioral_events.send',
  'crm.objects.custom.write',
  'crm.objects.custom.read',
  'crm.schemas.custom.read',
  'crm.objects.leads.read',
]

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

const getBearerToken = (authCode: string) => {
  const workspaceId = localStorage.getItem("workspaceId")

  fetch(
    `https://cerberus.eazybe.com/prod/api/v1/hubspotauthentication?workspace_id=${workspaceId}&grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`,
    { method: "POST" }
  )
    .then((res) => res.json())
    .then((data) => {
      ;(window as any).gtag?.("event", "Hubspotintegrated")
      ;(window as any).gtagAW?.("event", "Hubspotintegrated")
      const extensionId = localStorage.getItem("extensionId")
      sendMessageToChromeExtension(true, 500, extensionId || undefined)
      setTimeout(() => { window.close() }, 1000)
    })
    .catch((error) => {
      console.error("Error during getBearerToken:", error)
      ;(window as any).gtag?.("event", "Hubspotintegrated")
      ;(window as any).gtagAW?.("event", "Hubspotintegrated")
      const extensionId = localStorage.getItem("extensionId")
      sendMessageToChromeExtension(true, 500, extensionId || undefined)
      setTimeout(() => { window.close() }, 1000)
    })
}

const buildAuthUrl = () => {
  const baseUrl = 'https://app.hubspot.com/oauth/authorize'
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    optional_scope: optionalScopes.join(' ')
  })
  return `${baseUrl}?${params.toString()}`
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
        window.location.href = buildAuthUrl()
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
          <p className="text-white text-lg">Connecting to HubSpot...</p>
        </div>
      </div>
    </StandaloneShell>
  )
}
