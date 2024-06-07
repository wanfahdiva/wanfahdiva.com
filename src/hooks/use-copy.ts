import { useState } from 'react'

const useClipboard = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error)
      })
  }

  return { copied, copyToClipboard }
}

export default useClipboard
