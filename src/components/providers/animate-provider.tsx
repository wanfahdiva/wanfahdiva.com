'use client'

import ReactLenis from '@studio-freight/react-lenis'
import React, { useEffect, useState } from 'react'

import { Cursor } from '@/components/atoms/cursor'

import styles from './animate-provider.module.css'
import { DraftingSplash } from './drafting-splash'
import { INTRO_TIMING } from './intro-timing'

const DOMS = ['.primary-cursor', '.secondary-cursor', '.navbar', '.footer']
type IntroPhase = 'drawing' | 'leaving' | 'done'

interface AnimateProviderProps {
  content: React.ReactNode
}

export const AnimateProvider = ({ content }: AnimateProviderProps) => {
  const [phase, setPhase] = useState<IntroPhase>('drawing')

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reveal: ReturnType<typeof setTimeout> | undefined
    let finish: ReturnType<typeof setTimeout> | undefined
    const skip = () => {
      clearTimeout(reveal)
      clearTimeout(finish)
      setPhase('done')
    }
    const changeMotion = () => {
      if (motion.matches) skip()
    }
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skip()
    }
    if (motion.matches) skip()
    else {
      reveal = setTimeout(() => setPhase('leaving'), INTRO_TIMING.reveal)
      finish = setTimeout(() => setPhase('done'), INTRO_TIMING.reveal + INTRO_TIMING.fade)
    }
    motion.addEventListener('change', changeMotion)
    window.addEventListener('keydown', keydown)

    return () => {
      clearTimeout(reveal)
      clearTimeout(finish)
      motion.removeEventListener('change', changeMotion)
      window.removeEventListener('keydown', keydown)
    }
  }, [])

  useEffect(() => {
    if (phase === 'drawing') return
    document.getElementById('main')?.classList.remove('hidden')
    DOMS.forEach((selector) => document.querySelector(selector)?.classList.replace('!hidden', 'block'))
  }, [phase])

  return (
    <div className="relative w-full min-h-screen bg-onyx">
      {phase !== 'done' && (
        <div
          className={styles.splash}
          data-phase={phase}
          style={
            {
              '--intro-draw-delay': `${INTRO_TIMING.drawDelay}ms`,
              '--intro-draw': `${INTRO_TIMING.draw}ms`,
              '--intro-fill-delay': `${INTRO_TIMING.fillDelay}ms`,
              '--intro-fill': `${INTRO_TIMING.fill}ms`,
              '--intro-fade': `${INTRO_TIMING.fade}ms`
            } as React.CSSProperties
          }
          role="status"
          aria-label="Crafting the details. Preparing Wanfah Diva’s portfolio."
        >
          <DraftingSplash />
        </div>
      )}
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        {phase !== 'drawing' && content}
        {phase !== 'drawing' && <Cursor />}
      </ReactLenis>
    </div>
  )
}
