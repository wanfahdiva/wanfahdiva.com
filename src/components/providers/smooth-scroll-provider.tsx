'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 3, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
