import '@/shared/styles/app.css'

import { siteConfig } from '@/constants/config'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'

import { AnimateProvider } from '@/components/providers/animate-provider'

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png'
  },
  manifest: '/site.webmanifest'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />

      <body className="min-h-screen antialiased bg-onyx">
        <Analytics />
        <AnimateProvider content={children} />
      </body>
    </html>
  )
}
