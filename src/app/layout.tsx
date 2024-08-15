import '@/shared/styles/app.css'

import { siteConfig } from '@/constants/config'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'

import { SplashScreen } from '@/components/molecules/splash-screen'
import { ThemeProvider } from '@/components/providers/theme-provider'

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SplashScreen content={children} />
        </ThemeProvider>
      </body>
    </html>
  )
}
