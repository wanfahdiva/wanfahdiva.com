import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject, useEffect } from 'react'

/**
 * The hero leaves like a book cover being turned: the copy fades and rises a little faster than the page,
 * while the machine drifts behind it more slowly (a single, transform-and-opacity-only parallax).
 */
export function useHeroExit(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = root.current
    if (!element) return
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: element, start: 'top top', end: 'bottom top', scrub: true }
        })
        timeline
          .to('[data-hero-exit="copy"]', { yPercent: -18, opacity: 0, duration: 0.7 }, 0)
          .to('[data-hero-exit="footnote"]', { opacity: 0, duration: 0.25 }, 0)
          .to('[data-hero-exit="scene"]', { yPercent: 22, opacity: 0.35, duration: 1 }, 0)
      })
    }, element)

    return () => {
      media.revert()
      context.revert()
    }
  }, [root])
}
