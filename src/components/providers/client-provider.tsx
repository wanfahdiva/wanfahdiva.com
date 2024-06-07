'use client'

import api from '@/services/api'
import { fetcher } from '@/services/fetcher'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'

interface ClientProviderProps {
  children: React.ReactNode
  jwt?: string
}
export const ClientProvider: React.FC<ClientProviderProps> = ({ children, jwt }) => {
  if (jwt) {
    api.defaults.headers.Authorization = `Bearer ${jwt}`
  }

  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher
        }}
      >
        {children}
      </SWRConfig>
    </SessionProvider>
  )
}
