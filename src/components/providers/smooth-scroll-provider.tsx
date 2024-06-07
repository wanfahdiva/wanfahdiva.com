'use client'

import useSmoothScroll from '@/hooks/use-smooth-scroll'
import { useRouter } from 'next/navigation'
import React from 'react'

export const SmoothScrollProvider = () => {
  useSmoothScroll()

  const router = useRouter()
  React.useEffect(() => {
    // set window positon in top if route change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [router])

  return null
}
