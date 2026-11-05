'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface CursorProps {
  isSplash?: boolean
}

export const Cursor = ({ isSplash }: CursorProps) => {
  const primaryCursor = useRef<HTMLDivElement>(null)
  const secondaryCursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const primary = primaryCursor.current,
      secondary = secondaryCursor.current
    if (!primary || !secondary) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let moved = false,
      pressed = false,
      interactive: Element | null = null
    let x = 0,
      y = 0
    gsap.set([primary, secondary], { xPercent: -50, yPercent: -50 })
    const hoverTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest('button,a,[role="button"],label[for]') : null
    const scale = () => {
      const large = interactive && !interactive.classList.contains('rounded')
      gsap.to(primary, {
        scale: pressed ? 0.5 : large ? 3.85 : 1.05,
        duration: reduced.matches ? 0 : 0.22,
        ease: 'power2.out',
        overwrite: 'auto'
      })
      gsap.to(secondary, {
        scale: large ? 0.5 : 0.85,
        duration: reduced.matches ? 0 : 0.12,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
    const move = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      const target = hoverTarget(event.target)
      if (target !== interactive) {
        interactive = target
        scale()
      }
      gsap.set(secondary, { x, y })
      gsap.to(primary, { x, y, duration: !moved || reduced.matches ? 0 : 0.38, ease: 'power3.out', overwrite: 'auto' })
      moved = true
    }
    // Delegation includes buttons introduced after hydration or replaced during playback.
    const over = (event: MouseEvent) => {
      interactive = hoverTarget(event.target)
      scale()
    }
    const out = (event: MouseEvent) => {
      interactive = hoverTarget(event.relatedTarget)
      scale()
    }
    const down = (event: MouseEvent) => {
      pressed = true
      interactive = hoverTarget(event.target)
      scale()
    }
    const up = (event: MouseEvent) => {
      pressed = false
      interactive = hoverTarget(event.target)
      scale()
    }
    const leave = () => {
      interactive = null
      pressed = false
      scale()
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)

    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      gsap.killTweensOf([primary, secondary])
    }
  }, [])

  useEffect(() => {
    if (isSplash) gsap.set([primaryCursor.current, secondaryCursor.current], { x: innerWidth / 2, y: innerHeight / 2 })
  }, [isSplash])

  return (
    <div className="hidden md:block" aria-hidden="true">
      <div ref={primaryCursor} className="primary-cursor !hidden" />
      <div ref={secondaryCursor} className="secondary-cursor !hidden" />
    </div>
  )
}
