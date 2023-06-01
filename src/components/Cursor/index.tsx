import cn from 'clsx'
import { gsap } from 'gsap'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type CursorProps = {
  routerChange: boolean
}

export const Cursor = ({ routerChange }: CursorProps) => {
  const cursor = useRef<any>()
  const [isPointer, setIsPointer] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  const onMouseMove = useCallback(
    ({ clientX, clientY }: { clientX: number; clientY: number }) => {
      gsap.to(cursor.current as any, {
        x: clientX,
        y: clientY,
        duration: hasMoved ? 1 : 0,
        ease: 'Expo.easeOut',
        scale: isPointer ? 1.8 : 1,
      })
      setHasMoved(true)
    },
    [hasMoved, isPointer]
  )

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false)
    }
  }, [hasMoved, onMouseMove])

  useEffect(() => {
    const links = document.querySelectorAll('button, a')
    const handleMouseEnter = () => {
      setIsPointer(true)
    }
    const handleMouseLeave = () => {
      setIsPointer(false)
    }

    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter, false)
      link.addEventListener('mouseleave', handleMouseLeave, false)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter, false)
        link.removeEventListener('mouseleave', handleMouseLeave, false)
      })
    }
  }, [routerChange])

  return (
    <div
      style={{ opacity: hasMoved ? 1 : 0 }}
      ref={cursor}
      className={cn('cursor-class', isPointer && 'pointer')}
    />
  )
}
