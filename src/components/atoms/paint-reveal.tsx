'use client'

import { CSSProperties, useEffect, useId, useRef, useState } from 'react'

import styles from './paint-reveal.module.css'

// Six overlapping horizontal sweeps, alternating direction like a wide brush working down a page.
const STROKES = [8, 23, 38, 53, 68, 83].map((y, index) =>
  index % 2 ? `M172 ${y - 2}C118 ${y + 4} 46 ${y - 4} -12 ${y + 2}` : `M-12 ${y + 2}C42 ${y - 4} 114 ${y + 4} 172 ${y - 2}`
)
const STROKE_TIME = 380
const STAGGER = 150
const TOTAL = STAGGER * (STROKES.length - 1) + STROKE_TIME

/**
 * Covers its parent with a sheet of paper that is painted away by brush strokes the first time the parent
 * scrolls into view. Absolutely positioned: the parent must be positioned and clip its overflow.
 */
interface PaintRevealProps {
  color?: string
  seed?: number
  /** Observer margin: trigger at a reading line instead of the viewport edge. */
  rootMargin?: string
  threshold?: number
  delay?: number
}

export const PaintReveal = ({
  color = '#ededea',
  seed = 1,
  rootMargin = '0px',
  threshold = 0.35,
  delay = 0
}: PaintRevealProps) => {
  const id = useId().replace(/:/g, '')
  const element = useRef<SVGSVGElement>(null)
  // Armed only after mount, so the image stays visible without JavaScript or before hydration.
  const [state, setState] = useState<'idle' | 'armed' | 'painting' | 'done'>('idle')

  useEffect(() => {
    const target = element.current?.parentElement
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setState('done')
    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = setTimeout(() => {
          setState('painting')
          // Remove the overlay entirely once painted, so it costs nothing afterwards.
          timer = setTimeout(() => setState('done'), TOTAL + 320)
        }, delay)
      },
      { rootMargin, threshold }
    )
    // Content already on screen at load is never hidden and then repainted.
    const bounds = target.getBoundingClientRect()
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return setState('done')
    setState('armed')
    observer.observe(target)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [rootMargin, threshold, delay])

  if (state === 'done') return null

  return (
    <svg
      ref={element}
      className={styles.reveal}
      data-state={state}
      viewBox="0 0 160 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ '--paint-total': `${TOTAL}ms` } as CSSProperties}
    >
      <defs>
        {/* Streaky, ragged bristle edges: noise that changes fast across the stroke and slowly along it. */}
        <filter id={`${id}-brush`} x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.7" numOctaves="2" seed={seed} />
          <feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="90">
          <rect width="160" height="90" fill="white" />
          <g filter={`url(#${id}-brush)`} fill="none" stroke="black" strokeLinecap="round" strokeWidth="19">
            {STROKES.map((d, index) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                className={styles.stroke}
                style={{ animationDelay: `${index * STAGGER}ms`, animationDuration: `${STROKE_TIME}ms` }}
              />
            ))}
          </g>
        </mask>
      </defs>
      <rect width="160" height="90" fill={color} mask={`url(#${id}-mask)`} />
    </svg>
  )
}
