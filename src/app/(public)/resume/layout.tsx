import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Wanfah Diva Resume'
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>
}
