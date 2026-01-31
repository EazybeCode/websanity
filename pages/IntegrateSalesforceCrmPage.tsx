import React, { useEffect } from 'react'

const APP_URL_PREFIX_V2 = "https://api.eazybe.com/v2/"
const EXTENSION_ID_PRODUCTION = "clgficggccelgifppbcaepjdkklfcefd"
const REDIRECT_URI = "https://eazybe.com/integrate-salesforce-crm"
const SALESFORCE_DOMAIN = "login.salesforce"
const RESPONSE_TYPE = "code"
const CLIENT_ID = "3MVG9Kr5_mB04D17phMhLZXqXQ8jQnGDJCGPfV3M5yXC_LoGr1QkZc9sKJ1CSnmvaL5fKkolF5eYh3CU4MrGc"
const clientRedirectURI = `https://${SALESFORCE_DOMAIN}.com/services/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

declare global {
  interface Window {
    amplitude: any
    gtag: any
    gtagAW: any
    chrome: any
  }
}

const FETCHV2 = async (options: {
  url: string
  method?: string
  body?: string
}) => {
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

const createAuthSalesforce = (data: {
  code: string
  redirect_uri: string
  workspace_id: string | null
}): Promise<any> => {
  return new Promise((resolve) => {
    FETCHV2({
      method: 'POST',
      url: `salesforce/auth`,
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        console.log("createAuthSalesforce", { res })
        resolve(res)
      })
      .catch(() => {
        resolve(null)
      })
  })
}

const sendMessageToChromeExtension = (
  status: boolean,
  time: number = 10,
  extensionId: string = "clgficggccelgifppbcaepjdkklfcefd",
  key?: string
) => {
  console.log("sendMessageToChromeExtension : ", { EXTENSION_ID_PRODUCTION })
  setTimeout(() => {
    if (window.chrome?.runtime) {
      window.chrome.runtime.sendMessage(
        EXTENSION_ID_PRODUCTION,
        { key: key ?? "SALESFORCE_CONNECTED" },
        (response: any) => {
          console.log("sending msg to extension : ", {
            EXTENSION_ID_PRODUCTION,
            response,
          })
        }
      )
      window.chrome.runtime.sendMessage(
        extensionId,
        { key: key ?? "SALESFORCE_CONNECTED" },
        (response: any) => {
          console.log("sending msg to extension : ", {
            EXTENSION_ID_PRODUCTION,
            response,
          })
        }
      )
    }
  }, time)
}

const getBearerToken = async (authCode: string) => {
  console.log("getBearerToken called : ", authCode)

  const data = {
    code: authCode,
    redirect_uri: REDIRECT_URI,
    workspace_id: localStorage.getItem("workspaceId"),
  }

  const resGetBearerToken = await createAuthSalesforce(data)
  if (resGetBearerToken?.status) {
    window.gtag?.("event", "Salesforceintegrated")
    window.gtagAW?.("event", "Salesforceintegrated")
    sendMessageToChromeExtension(true, 500, localStorage.getItem("extensionId") || undefined)
    setTimeout(() => {
      window.close()
    }, 1000)
  }
}

const IntegrateSalesforceCrmPage: React.FC = () => {
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
      const authToken = urlParamsObject['authToken'] || null
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
      if (authToken) {
        localStorage.setItem("authToken", authToken)
      }

      console.log("Workspace ID:", workspaceId)
      console.log("Email:", email)
      console.log("Auto Connect:", autoConnect)

      if (autoConnect) {
        window.location.href = clientRedirectURI
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
        <p className="text-white text-lg">Connecting to Salesforce...</p>
      </div>
    </div>
  )
}

export default IntegrateSalesforceCrmPage
