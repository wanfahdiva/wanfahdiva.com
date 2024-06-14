import '@/shared/styles/app.css'

import { siteConfig } from '@/constants/config'
import { Analytics } from '@vercel/analytics/react'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

import { Cursor } from '@/components/atoms/cursor'
import { SplashScreen } from '@/components/molecules/splash-screen'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <React.Fragment>
            <NextTopLoader color="white" showSpinner={false} />
            <SmoothScrollProvider />
            <SplashScreen />
            <Cursor />
            <main id="main" className="hidden">
              {children}
            </main>
          </React.Fragment>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
