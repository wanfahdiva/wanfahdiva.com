import cn from 'clsx'
import { gsap } from 'gsap'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export const Cursor = () => {
  const cursor = useRef<any>()
  const [isPointer, setIsPointer] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  const onMouseMove = useCallback(
    ({ clientX, clientY }) => {
      gsap.to(cursor.current as any, {
        x: clientX,
        y: clientY,
        duration: hasMoved ? 1 : 0,
        ease: 'Expo.easeOut',
        scale: isPointer ? 1.5 : 1,
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
    const links = document.querySelectorAll('a')
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
  }, [])
  return (
    <div>
      <div
        style={{ opacity: hasMoved ? 1 : 0 }}
        ref={cursor}
        className={cn('cursor-class', isPointer && 'pointer')}
      ></div>
    </div>
  )
}
