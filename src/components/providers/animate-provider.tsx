'use client'

import ReactLenis from '@studio-freight/react-lenis'
import { motion, useAnimation } from 'framer-motion'
import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

import { Cursor } from '@/components/atoms/cursor'

import { cn } from '@/lib/utils'

const WORDS = [
  'Hai',
  'Hello',
  'Hola',
  'Bonjour',
  'Ciao',
  'こんにちは',
  '你好',
  'Olá',
  'Hej',
  'Привет',
  'Merhaba',
  '안녕하세요',
  'สวัสดี',
  'Hallå',
  'Hallo',
  'Salut',
  'Welcome',
  'Velkommen',
  'Namaste',
  'Salam',
  '👋'
]
const DOMS = ['.primary-cursor', '.secondary-cursor', '.navbar', '.footer']

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

interface AnimateProviderProps {
  content: React.ReactNode
}

export const AnimateProvider = ({ content }: AnimateProviderProps) => {
  const controls = useAnimation()
  const counterRef = useRef<HTMLDivElement>(null)

  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(IS_DEVELOPMENT ? false : true)
  const [isFinished, setIsFinished] = useState(IS_DEVELOPMENT ? true : false)

  const options = {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.1 }
    }
  }

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
          const currentValue = counterElement.innerHTML
          const percentage = Math.floor(parseInt(currentValue))
          counterElement.innerHTML = percentage <= 99 ? `0${percentage}%` : `${percentage}%`
          bar?.setAttribute('style', `width: ${currentValue}%`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (index == WORDS.length - 1) {
      return
    }

    setTimeout(
      () => {
        setIndex(index + 1)
      },
      index == 0 ? 400 : 100
    )
  }, [index])

  return (
    <div className="relative w-full min-h-screen bg-onyx">
      <div
        className={cn(
          'flex h-screen w-full items-center justify-center opacity-100 transition-opacity duration-500 ease-in-out flex-col space-y-5 relative',
          !isLoading && 'opacity-0',
          isFinished && 'hidden'
        )}
      >
        <div className="absolute example left-10 top-10">
          <p className="font-semibold text-center text-white" ref={counterRef}>
            0%
          </p>
          <div className="max-w-20 h-0.5 rounded bg-white w-0 bar" />
        </div>
        <div className="relative h-16 overflow-hidden w-44">
          <div className="absolute top-0 left-0 w-full">
            <motion.p
              variants={options}
              initial="initial"
              animate="enter"
              className="flex items-center justify-center h-16 text-3xl font-bold text-center text-white"
            >
              {WORDS[index]}
            </motion.p>
          </div>
        </div>
      </div>

      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        {!isLoading && content}
        <Cursor isSplash={isLoading} />
      </ReactLenis>
    </div>
  )
}
