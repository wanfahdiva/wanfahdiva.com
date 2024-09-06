'use client'

import ReactLenis from '@studio-freight/react-lenis'
import { motion, useAnimation } from 'framer-motion'
import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

import { Cursor } from '@/components/atoms/cursor'

import { cn } from '@/lib/utils'

const DOMS = ['.primary-cursor', '.secondary-cursor', '.navbar', '.footer']
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const Logo: React.FC<{ fill: boolean }> = ({ fill }) => (
  <motion.svg
    width="192"
    height="192"
    viewBox="0 0 192 192"
    fill={fill ? '#A1A1AA' : 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1
      }}
      strokeWidth={1.5}
      strokeDasharray="0 1"
      fill={fill ? '#A1A1AA' : 'none'}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M78.9922 22.2825C70.8177 24.266 59.2887 29.5095 52.3922 34.3779L48.5469 37.0935V79.3091V121.523L59.7333 110.391L70.9198 99.2585L82.1063 110.391L93.2927 121.523V112.744C93.2927 112.744 91.8413 110.28 82.1133 100.6L70.9352 89.4756L63.2361 97.0861L55.5384 104.697V72.9191V66.8287V41.1416L60.8744 37.6072C85.7419 21.1333 121.086 25.2948 143.052 47.2824C181.673 85.9454 160.403 151.012 106.097 160.335C85.8412 163.812 64.5477 156.771 49.4012 141.589C28.3637 120.503 25.3038 87.2947 36.6892 64.2322C39.3656 58.8109 39.5 58 41.5 54C41.5 54 41.5 48.5 41.5 42C41.5 42 22 61 22 93.7533C21.8951 129.957 49.7592 162.357 85.4231 167.5C125.443 173.273 163.488 144.797 169.25 104.76C176.586 53.7885 128.863 10.1801 78.9922 22.2825ZM86.3473 67.2439C86.3473 67.2439 86.3068 69.7318 86.3473 81.4479C86.3865 92.6012 86.3473 95.7439 86.3473 95.7439L93.2927 101.642C93.2927 101.642 93.2927 94.9935 93.2927 87.2947V73.2971L106.227 73.3279C121.625 73.3643 129.454 76.2128 133.81 83.3642C137.518 89.4546 137.518 99.1326 133.81 105.223C130.619 110.461 121.532 115.213 114.617 115.259L110.072 115.29V98.4929V81.6957H106.539H103.004L103.393 101.642L103.78 121.589L113.63 121.414C124.651 121.22 133.003 117.881 137.827 111.742C148.119 98.644 143.833 77.8043 129.298 70.2736C124.36 67.7162 120.641 67.1339 107.276 66.8287C98.4315 66.6258 86.3473 67.2439 86.3473 67.2439Z"
    />
  </motion.svg>
)

interface AnimateProviderProps {
  content: React.ReactNode
}

export const AnimateProvider = ({ content }: AnimateProviderProps) => {
  const controls = useAnimation()
  const counterRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(!IS_DEVELOPMENT)
  const [isFinished, setIsFinished] = useState(IS_DEVELOPMENT)

  const showContent = () => {
    const main = document.getElementById('main')
    main?.classList.remove('hidden')

    setTimeout(() => {
      DOMS.forEach((el) => {
        document.querySelector(el)?.classList.replace('!hidden', 'block')
      })
    }, 500)
  }

  useEffect(() => {
    controls.start({ y: 0, opacity: 1 })
  }, [controls])

  useEffect(() => {
    const counterElement = counterRef.current
    const bar = document.querySelector('.bar')
    if (counterElement) {
      gsap.to(counterElement, {
        innerHTML: 100,
        duration: 2.5,
        ease: 'power1.out',
        onUpdate: () => {
          const percentage = Math.floor(Number(counterElement.innerHTML))
          counterElement.innerHTML = percentage < 100 ? `0${percentage}%` : `${percentage}%`
          bar?.setAttribute('style', `width: ${percentage}%`)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (IS_DEVELOPMENT) {
      showContent()
    } else {
      document.body.classList.add('cursor-wait')
      setTimeout(() => {
        setIsLoading(false)
        showContent()
      }, 3000)

      setTimeout(() => {
        setIsFinished(true)
        document.body.classList.remove('cursor-wait')
      }, 3500)
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-onyx">
      <div
        className={cn(
          'flex h-screen w-full items-center justify-center transition-opacity duration-500 ease-in-out flex-col space-y-5 relative',
          !isLoading && 'opacity-0',
          isFinished && 'hidden'
        )}
      >
        {/* Counter Loading */}
        <div className="absolute left-10 top-10">
          <p className="font-semibold text-center text-white" ref={counterRef}>
            0%
          </p>

          <div className="max-w-20 h-0.5 rounded bg-white w-0 bar" />
        </div>

        {/* Animated Logo */}
        <div className="relative overflow-hidden logo-wrapper">
          <Logo fill={!isLoading} />
        </div>
      </div>

      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        {!isLoading && content}
        <Cursor isSplash={isLoading} />
      </ReactLenis>
    </div>
  )
}
