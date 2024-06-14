'use client'

import { useAnimation } from 'framer-motion'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const greetings = ['Hai', 'Hello', 'Hola', 'Bonjour', 'Ciao', 'こんにちは', '你好', 'Olá', 'Hej', 'Привет', 'Merhaba']
const doms = ['.primary-cursor', '.secondary-cursor', '.navbar', '.footer']

export const SplashScreen = () => {
  const router = usePathname()
  const counterRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const textContainerRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    controls.start({ y: 0, opacity: 1 })
  }, [controls])

  const showContent = () => {
    const main = document.getElementById('main')
    main?.classList.remove('hidden')
    if (router != '/resume') {
      setTimeout(() => {
        doms.forEach((el) => {
          document.querySelector(el)?.classList.replace('!hidden', 'block')
        })
      }, 1000)
    }
  }

  useEffect(() => {
    const counterElement = counterRef.current
    const bar = document.querySelector('.bar')
    if (counterElement) {
      gsap.to(counterElement, {
        innerHTML: 100,
        duration: 4.5,
        ease: 'power1.out',
        onUpdate: () => {
          const currentValue = counterElement.innerHTML
          const percentage = Math.floor(parseInt(currentValue))
          counterElement.innerHTML = `${percentage <= 99 ? '0' : ''}${percentage}%`
          bar?.setAttribute('style', `width: ${currentValue}%`)
        }
      })
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      showContent()
    }, 5000)
    setTimeout(() => {
      setIsFinished(true)
    }, 6000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const textContainerElement = textContainerRef.current
    if (textContainerElement) {
      const timeline = gsap.timeline()

      timeline.to(textContainerElement, {
        y: `-${(greetings.length - 1) * 100}%`,
        duration: greetings.length * 2.5,
        ease: 'power1.inOut',
        onComplete: () => {
          timeline.pause()
        }
      })
    }
  }, [])

  return (
    <div
      className={cn(
        'flex h-screen w-full items-center justify-center opacity-100 transition-opacity duration-700 ease-in-out flex-col space-y-5 relative',
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
        <div ref={textContainerRef} className="absolute top-0 left-0 w-full">
          {greetings.map((greeting, index) => (
            <div key={index} className="flex items-center justify-center h-16 text-3xl font-bold text-center text-white">
              {greeting}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
