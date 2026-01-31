import React, { useEffect } from 'react'

const CLIENT_ID = "app.6448e61fad4676.49982309"
const EXTENSION_ID_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const REDIRECT_URI = "https://eazybe.com/integrate-bitrix-crm"

declare global {
  interface Window {
    amplitude: any
    gtag: any
    gtagAW: any
    chrome: any
  }
}

const getClientRedirectURL = (): string | null => {
  const domain = localStorage.getItem("bitrixDomain")
  if (!domain) return null
  return `https://${domain}/oauth/authorize/?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`
}

const sendMessageToChromeExtension = () => {
  const localExtensionId = localStorage.getItem("extensionId")
  console.log("sendMessageToChromeExtension : ", localExtensionId)

  if (!window.chrome?.runtime) return

  setTimeout(() => {
    const message = { key: "BITRIX_CONNECTED" }

    const ids = [localExtensionId, EXTENSION_ID_PRODUCTION].filter(Boolean) as string[]
    ids.forEach((id) => {
      window.chrome.runtime.sendMessage(id, message, (response: any) => {
        console.log("sending msg to extension : ", { id, response })
      })
    })
  }, 500)
}

const saveBitrixToken = async (
  accessToken: string,
  refreshToken: string,
  endpoint: string,
  expires: number
) => {
  try {
    const url = `https://eazybe.com/api/v1/whatzapp/bitrix/createauth`
    const body = {
      workspace_id: localStorage.getItem("workspaceId"),
      access_token: accessToken,
      refresh_token: refreshToken,
      client_endpoint: endpoint,
      expires,
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    console.log("saveBitrixToken response", data)

    if (data?.result) {
      window.gtag?.("event", "Bitrixintegrated")
      window.gtagAW?.("event", "Bitrixintegrated")

      sendMessageToChromeExtension()

      setTimeout(() => window.close(), 1000)
    } else {
      console.error("Failed to authenticate, please try again")
    }
  } catch (error) {
    console.error("Error saving Bitrix token:", error)
  }
}

const getBearerToken = async (authCode: string) => {
  console.log("getBearerToken called : ", authCode)

  try {
    const response = await fetch(
      `https://eazybe.com/api/v1/whatzapp/bitrix/authentication?client_id=${CLIENT_ID}&code=${authCode}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`
    )
    const res = await response.json()
    console.log("getBearerToken res", res)

    const { data } = res || {}
    if (data?.access_token && data?.refresh_token && data?.client_endpoint) {
      await saveBitrixToken(
        data.access_token,
        data.refresh_token,
        data.client_endpoint,
        data.expires
      )
    } else {
      console.error("Failed to authenticate, please try again")
    }
  } catch (error) {
    console.error("Error getting bearer token:", error)
  }
}

const IntegrateBitrixCrmPage: React.FC = () => {
  useEffect(() => {
    const extractParams = async () => {
      console.log("Entered extractParams function")

      const url = new URL(window.location.href)
      const urlParams = new URLSearchParams(url.search)
      const encryptedParams = urlParams.get("params")

      const urlParamsObject: Record<string, string> = {}

      try {
        if (encryptedParams) {
          const response = await fetch(
            "https://api.eazybe.com/v2/other/decrypt-url",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ encryptedUrl: encryptedParams }),
            }
          )

          if (!response.ok) throw new Error("Failed to decrypt URL")

          const { data } = await response.json()
          console.log("Decrypted URL:", data)

          new URLSearchParams(data).forEach((value, key) => {
            urlParamsObject[key] = value
          })
        } else {
          urlParams.forEach((value, key) => {
            urlParamsObject[key] = value
          })
        }
      } catch (error) {
        console.error("Error extracting params:", error)
      }

      console.log("Extracted URL Parameters:", urlParamsObject)

      // Assign variables
      const workspaceId = urlParamsObject["workspaceid"] || null
      const email = urlParamsObject["user_email"] || null
      const extensionId = urlParamsObject["extensionId"] || null
      const authToken = urlParamsObject["authToken"] || null
      const bitrixDomain =
        urlParamsObject["domain"] || localStorage.getItem("bitrixDomain") || null
      const autoConnect = urlParamsObject["connect"] === "true"

      // Save to localStorage if exists
      if (workspaceId) localStorage.setItem("workspaceId", workspaceId)
      if (email) localStorage.setItem("email", email)
      if (extensionId) localStorage.setItem("extensionId", extensionId)
      if (authToken) localStorage.setItem("authToken", authToken)
      if (bitrixDomain) localStorage.setItem("bitrixDomain", bitrixDomain)

      console.log("Workspace ID:", workspaceId)
      console.log("Email:", email)
      console.log("Bitrix Domain:", bitrixDomain)
      console.log("Auto Connect:", autoConnect)

      // Redirect if autoConnect is true and domain exists
      if (autoConnect && bitrixDomain) {
        const redirectURL = getClientRedirectURL()
        if (redirectURL) {
          window.location.href = redirectURL
          return
        }
      }

      // If auth code exists, exchange it
      if (urlParamsObject?.code) {
        const tempCode = urlParamsObject.code
        console.log("code found", { tempCode })
        await getBearerToken(tempCode)
      }
    }

    extractParams()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Connecting to Bitrix24...</p>
      </div>
    </div>
  )
}

export default IntegrateBitrixCrmPage
