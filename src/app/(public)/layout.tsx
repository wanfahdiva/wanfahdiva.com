import React from 'react'

import { Footer } from '@/components/molecules/footer'
import { Navbar } from '@/components/molecules/navbar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
