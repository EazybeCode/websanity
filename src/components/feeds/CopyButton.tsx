'use client'

import { useState } from 'react'

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may be blocked (older browsers, no HTTPS). Fall back
      // to the legacy execCommand path so the button still does something.
      const ta = document.createElement('textarea')
      ta.value = value
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {}
      document.body.removeChild(ta)
    }
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary"
      style={{ minWidth: 130 }}
    >
      {copied ? '✓ Copied' : label}
    </button>
  )
}
