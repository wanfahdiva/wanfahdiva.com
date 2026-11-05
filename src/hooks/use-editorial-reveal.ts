import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RefObject, useEffect } from 'react'

// Editorial sections reveal at a reading position, rather than at the viewport edge.
export function useEditorialReveal(root: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = root.current
    if (!element) return
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const items = Array.from(element.querySelectorAll<HTMLElement>('[data-editorial-reveal]'))
        gsap.set(items, { opacity: 0, y: 12 })
        const triggers = items.map((item) =>
          ScrollTrigger.create({
            trigger: item,
            // The final lines must also reveal when the page cannot scroll any further.
            start: () =>
              Math.max(
                0,
                Math.min(
                  item.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.6,
                  ScrollTrigger.maxScroll(window) - 1
                )
              ),
            once: true,
            onEnter: () => {
              if (item.contains(document.activeElement)) gsap.set(item, { clearProps: 'opacity,transform' })
              else
                gsap.to(item, {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  delay: Number(item.dataset.revealDelay || 0) / 1000,
                  ease: 'power3.out',
                  overwrite: 'auto',
                  onComplete: () => {
                    gsap.set(item, { clearProps: 'opacity,transform' })
                  }
                })
            }
          })
        )
        const focus = (event: FocusEvent) => {
          const item = items.find((item) => item.contains(event.target as Node))
          if (item) {
            gsap.killTweensOf(item)
            gsap.set(item, { clearProps: 'opacity,transform' })
          }
        }
        element.addEventListener('focusin', focus)

        return () => {
          triggers.forEach((trigger) => trigger.kill())
          gsap.killTweensOf(items)
          gsap.set(items, { clearProps: 'opacity,transform' })
          element.removeEventListener('focusin', focus)
        }
      })
    }, element)

    return () => {
      media.revert()
      context.revert()
    }
  }, [root])
}
