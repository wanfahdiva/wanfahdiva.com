'use client'

import { motion } from 'framer-motion'
// import cn from 'clsx'
import { gsap } from 'gsap'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CursorProps {
  isSplash?: boolean
}

export const Cursor = ({ isSplash }: CursorProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const primaryCursor = useRef<HTMLDivElement | null>(null)
  const secondaryCursor = useRef<HTMLDivElement | null>(null)

  const [isPointer, setIsPointer] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)
  const [isButton, setIsButton] = useState(false)

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const { clientX, clientY } = event

      // move the bullet cursor instantly
      gsap.set(secondaryCursor.current, {
        x: clientX,
        y: clientY,
        ease: 'Expo.easeOut',
        scale: !isButton && isPointer ? 0.5 : 0.85
      })

      // move the custom cursor with delay
      gsap.to(primaryCursor.current, {
        x: clientX,
        y: clientY,
        duration: hasMoved ? 0.75 : 0,
        ease: 'Expo.easeOut',
        scale: !isButton && isPointer ? 3.85 : 1.05
      })

      setHasMoved(true)
    },
    [hasMoved, isButton, isPointer]
  )

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  useEffect(() => {
    setTimeout(() => {
      // first set hover false on all links
      setIsPointer(false)
      setIsButton(false)
      const links = document.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>('button, a')

      const handleMouseEnter = (event: Event) => {
        const target = event.target as HTMLElement
        const isButton = target.classList.contains('rounded')

        setIsButton(isButton)
        setIsPointer(true)
      }

      const handleMouseLeave = () => {
        setIsButton(false)
        setIsPointer(false)
      }

      links.forEach((link) => {
        link.addEventListener('mouseenter', handleMouseEnter)
        link.addEventListener('mouseleave', handleMouseLeave)
      })

      return () => {
        links.forEach((link) => {
          link.removeEventListener('mouseenter', handleMouseEnter)
          link.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    }, 50)
  }, [router, pathname, isSplash])

  useEffect(() => {
    const handleMouseDown = () => {
      gsap.to(primaryCursor.current, {
        scale: 0.5,
        duration: 0.5,
        ease: 'Expo.easeOut'
      })
    }

    const handleMouseUp = () => {
      gsap.to(primaryCursor.current, {
        scale: 1,
        duration: 0.5,
        ease: 'Expo.easeOut'
      })
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (isSplash) {
      gsap.set(primaryCursor.current, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      })

      gsap.set(secondaryCursor.current, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      })
    }
  }, [isSplash])

  return (
    <div className="hidden md:block">
      <motion.div ref={primaryCursor} className="primary-cursor !hidden" />
      <motion.div ref={secondaryCursor} className="secondary-cursor !hidden" />
    </div>
  )
}
