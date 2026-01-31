import React, { useEffect } from 'react'

const EXTENSION_ID_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const CLIENT_ID_RAJAT = "1000.77NM4BCO7LABBJ3FKDXGIEIKODXMQI"
const CLIENT_SECRET_RAJAT = "6cc2985329348dc754bfe0b721b5a4a850ef50e330"
const REDIRECT_URI = "https://eazybe.com/integrate-zoho-crm"

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
  console.log("sendMessageToChromeExtension entered", { status, time, extensionId })
  setTimeout(() => {
    if (window.chrome?.runtime) {
      window.chrome.runtime.sendMessage(
        extensionId,
        { key: key ?? "ZOHO_CONNECTED" },
        (response: any) => {
          console.log("response : ", response)
          if (!response?.success) {
            console.log("Chrome runtime msg sent to extension")
          }
        }
      )
      window.chrome.runtime.sendMessage(
        EXTENSION_ID_PRODUCTION,
        { key: key ?? "ZOHO_CONNECTED" },
        (response: any) => {
          console.log("response : ", response)
          if (!response?.success) {
            console.log("Chrome runtime msg sent to extension")
          }
        }
      )
    } else {
      console.log("Chrome runtime not found")
    }
  }, time)
}

const getRedirectURI = async (): Promise<string> => {
  try {
    const resp = await fetch("https://eazybe.com/api/v1/whatzapp/zoho/scopes")
    const response = await resp.json()

    console.log("getRedirectURI response", response)

    const finalUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=${response.data.scopes}&client_id=${CLIENT_ID_RAJAT}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URI}`
    console.log("getRedirectURI finalUrl", finalUrl)
    return finalUrl
  } catch (err) {
    console.error("Error in getRedirectURI", err)
    return `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.READ,ZohoCRM.modules.ALL,ZohoCRM.settings.profiles.READ,ZohoCRM.settings.fields.ALL,ZohoCRM.org.ALL,ZohoCRM.settings.layouts.ALL,ZohoCRM.settings.map_dependency.READ,ZohoCRM.Files.CREATE,ZohoCRM.Files.READ,WorkDrive.files.CREATE,ZohoCRM.coql.READ&client_id=${CLIENT_ID_RAJAT}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URI}`
  }
}

const getBearerToken = async (tempCode: string, tempAccountServerUrl: string) => {
  const clientId = CLIENT_ID_RAJAT
  const clientSecret = CLIENT_SECRET_RAJAT
  const redirectUri = REDIRECT_URI
  const code = tempCode

  if (!code) return

  try {
    const resp = await fetch(
      "https://eazybe.com/api/v1/whatzapp/zoho/auth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temp_account_server_url: tempAccountServerUrl,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          temp_code: code,
          workspace_id: localStorage.getItem("workspaceId"),
        }),
      }
    )

    const response = await resp.json()

    console.log("getBearerToken response from zoho ", response)
    const refreshToken = response?.data?.refresh_token
    if (response?.result) {
      window.gtag?.("event", "Zohointegrated")
      window.gtagAW?.("event", "Zohointegrated")
      sendMessageToChromeExtension(true, 500, localStorage.getItem("extensionId") || undefined)
      setTimeout(() => {
        window.close()
      }, 1000)
    } else {
      console.error("something went wrong, couldn't integrate")
    }
    console.log("Refresh Token:", refreshToken)
  } catch (error) {
    console.error("Error:", error)
  }
}

const IntegrateZohoCrmPage: React.FC = () => {
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
        window.location.href = await getRedirectURI()
        return
      }

      if (urlParamsObject?.code) {
        const tempCode = urlParamsObject.code
        const tempAccountServerUrl = urlParamsObject["accounts-server"]
        getBearerToken(tempCode, tempAccountServerUrl)
        console.log("code found", { tempCode, tempAccountServerUrl })
      }
    }

    extractParams()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Connecting to Zoho CRM...</p>
      </div>
    </div>
  )
}

export default IntegrateZohoCrmPage
