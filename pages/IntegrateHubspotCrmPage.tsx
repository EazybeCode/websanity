import React, { useEffect } from 'react'

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

declare global {
  interface Window {
    amplitude: any
    gtag: any
    gtagAW: any
    chrome: any
  }
}

const sendMessageToChromeExtension = (
  status: boolean,
  time: number = 10,
  extensionId: string = "fpnlneiiaeclcckbcoldjhcpaofgdmfl",
  key?: string
) => {
  setTimeout(() => {
    console.log("sendMessageToChromeExtension extensionIdToSendMessageTo", extensionId)
    if (window.chrome?.runtime) {
      window.chrome.runtime.sendMessage(
        extensionId,
        { key: key ?? "HUBSPOT_CONNECTED" },
        (response: any) => {
          console.log("response : ", response)
        }
      )

      window.chrome.runtime.sendMessage(
        EXTENSION_ID_PRODUCTION,
        { key: key ?? "HUBSPOT_CONNECTED" },
        (response: any) => {
          console.log("response : ", response)
        }
      )
    }
  }, time)
}

const getBearerToken = (authCode: string) => {
  console.log("getBearerToken called:", authCode)
  const workspaceId = localStorage.getItem("workspaceId")

  fetch(
    `https://eazybe.com/api/v1/whatzapp/hubspotauthentication?workspace_id=${workspaceId}&grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`,
    { method: "POST" }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.result) {
        window.amplitude?.getInstance()?.logEvent('SUCCESSFULLY_GOT_RESULT', { workspaceid: workspaceId })
        window.gtag?.("event", "Hubspotintegrated")
        window.gtagAW?.("event", "Hubspotintegrated")
        const extensionId = localStorage.getItem("extensionId")
        sendMessageToChromeExtension(true, 500, extensionId || undefined)
        setTimeout(() => {
          window.close()
        }, 1000)
      } else {
        window.amplitude?.getInstance()?.logEvent('GOT_RESULT_BUT_FALSE', { workspaceid: workspaceId })
        window.gtag?.("event", "Hubspotintegrated")
        window.gtagAW?.("event", "Hubspotintegrated")
        const extensionId = localStorage.getItem("extensionId")
        sendMessageToChromeExtension(true, 500, extensionId || undefined)
        setTimeout(() => {
          window.close()
        }, 1000)
      }
    })
    .catch((error) => {
      window.amplitude?.getInstance()?.logEvent('GOT_INTO_CATCH', { workspaceid: workspaceId })
      console.error("Error during getBearerToken:", error)
      window.gtag?.("event", "Hubspotintegrated")
      window.gtagAW?.("event", "Hubspotintegrated")
      const extensionId = localStorage.getItem("extensionId")
      sendMessageToChromeExtension(true, 500, extensionId || undefined)
      setTimeout(() => {
        window.close()
      }, 1000)
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

const IntegrateHubspotCrmPage: React.FC = () => {
  useEffect(() => {
    const extractParams = async () => {
      console.log("Entered extractParams function")

      const url = new URL(window.location.href)
      console.log("url", url)

      const urlParams = new URLSearchParams(url.search)
      console.log("urlParams", urlParams)

      const encryptedParams = urlParams.get("params")
      console.log("encryptedParams", encryptedParams)

      const urlParamsObject: Record<string, string> = {}

      if (encryptedParams) {
        try {
          const response = await fetch("https://api.eazybe.com/v2/other/decrypt-url", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ encryptedUrl: encryptedParams }),
          })

          if (!response.ok) {
            throw new Error("Failed to decrypt URL")
          }

          const { data } = await response.json()
          console.log("Decrypted URL:", data)

          const urlParamsNew = new URLSearchParams(data)
          urlParamsNew.forEach((value, key) => {
            urlParamsObject[key] = value
          })
        } catch (error) {
          console.error("Error decrypting params:", error)
        }
      } else {
        urlParams.forEach((value, key) => {
          urlParamsObject[key] = value
        })
      }

      console.log("Extracted URL Parameters:", urlParamsObject)

      const workspaceId = urlParamsObject['workspaceid'] || null
      const email = urlParamsObject['user_email'] || null
      const extensionId = urlParamsObject['extensionId'] || null
      const autoConnect = urlParamsObject['connect'] === "true"

      if (workspaceId) {
        localStorage.setItem("workspaceId", workspaceId)
      }
      if (email) {
        localStorage.setItem("email", email)
      }
      if (extensionId) {
        localStorage.setItem("extensionId", extensionId)
      }

      console.log("Workspace ID:", workspaceId)
      console.log("Email:", email)
      console.log("Auto Connect:", autoConnect)

      if (autoConnect) {
        window.location.href = buildAuthUrl()
        return
      }

      if (urlParamsObject?.code) {
        const tempCode = urlParamsObject.code
        getBearerToken(tempCode)
        console.log("code found", { tempCode })
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

export default IntegrateHubspotCrmPage
