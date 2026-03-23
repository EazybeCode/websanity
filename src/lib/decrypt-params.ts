import CryptoJS from 'crypto-js'

const SECRET_KEY = 'rgewew3f547jfj7j85fj780fj078fhnmcxmewojirmqpjoxjmofcercmfqop745'

export function decryptParams(encryptedParams: string): Record<string, string> {
  const decoded = decodeURIComponent(encryptedParams)
  const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY)
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8)

  const result: Record<string, string> = {}
  if (decryptedText) {
    new URLSearchParams(decryptedText).forEach((value, key) => {
      result[key] = value
    })
  }
  return result
}
