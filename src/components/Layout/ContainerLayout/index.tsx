import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

import { useIsDesktop } from '@/hooks/useWindowSize'

gsap.registerPlugin(ScrollTrigger)

interface ContainerLayoutProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
  className,
  id,
}) => {
  const isDekstop = useIsDesktop()
  const sectionRef = useRef<any>(null)
  const { setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current

      if (section) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY

        if (scrollY > sectionTop + sectionHeight - windowHeight) {
          const opacity =
            1 -
            (scrollY - (sectionTop + sectionHeight - windowHeight)) /
              (isDekstop ? 500 : 750)
          section.style.opacity = opacity
        } else {
          section.style.opacity = 1
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDekstop])

  useEffect(() => {
    const section = document.getElementById('procces')

    if (section) {
      gsap.from(section, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            // Change the theme when the section is in view
            setTheme('light')
          },
          onLeaveBack: () => {
            // Change the theme back when the section is out of view
            setTheme('dark')
          },
          onLeave: () => {
            // Change the theme back when the section is out of view
            setTheme('dark')
          },
          onEnterBack: () => {
            // Change the theme when the section is in view
            setTheme('light')
          },
        },
      })
    }
  }, [setTheme])

  return (
    <div ref={sectionRef} className={className} id={id}>
      {children}
    </div>
  )
}
