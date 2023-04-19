import { gsap } from 'gsap'
import React, { useEffect, useRef } from 'react'

import clsxm from '@/lib/clsxm'

import { LogoIcon } from '@/components/Icons'
interface SplashScreenProps {
  endedLoading: boolean
}

export const SplashScreen = ({ endedLoading }: SplashScreenProps) => {
  const counterRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const counterElement = counterRef.current
    if (counterElement) {
      gsap.to(counterElement, {
        innerHTML: 100,
        duration: 3,
        ease: 'power1.out',
        onUpdate: () => {
          const currentValue = counterElement.innerHTML
          counterElement.innerHTML = `${Math.floor(parseInt(currentValue))}%`
        },
      })
    }
  }, [])
  return (
    <div
      className={clsxm(
        'flex h-screen w-full items-center justify-center opacity-100 transition-all duration-700 ease-in-out',
        endedLoading && 'opacity-0'
      )}
    >
      <div className='example'>
        <LogoIcon />
        <div className='text-center' ref={counterRef}>
          0%
        </div>
      </div>
    </div>
  )
}
