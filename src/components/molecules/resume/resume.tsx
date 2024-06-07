'use client'

import { useEffect, useState } from 'react'
type PDFFile = string | File | null

export const Resume = () => {
  const [file] = useState<PDFFile>('https://wanfahdiva-com-git-dev-wanfahdiva.vercel.app/resume.pdf')

  useEffect(() => {
    const doms = ['.primary-cursor', '.secondary-cursor', '.navbar', '.footer']
    doms.forEach((d) => {
      const element = document.querySelector(d)
      if (element) {
        element.classList.add('!hidden')
      }
    })
  }, [])

  return (
    <div className="overflow-hidden">
      <iframe
        src={typeof file === 'string' ? file : file instanceof File ? URL.createObjectURL(file) : ''}
        className="w-full h-screen"
        title="resume"
      />
    </div>
  )
}
