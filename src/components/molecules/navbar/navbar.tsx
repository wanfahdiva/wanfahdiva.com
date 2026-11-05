'use client'

import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/constants/social'
import { useLenis } from '@studio-freight/react-lenis'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { scroller } from 'react-scroll'

import { SectionLink } from '@/components/atoms/section-link'

import { cn } from '@/lib/utils'

import styles from './navbar.module.css'

// Seven alternating sweeps down the screen, overlapping so the page underneath disappears completely.
const WASH = [6, 20, 34, 48, 62, 76, 92].map((y, index) =>
  index % 2 ? `M112 ${y - 2}C70 ${y + 3} 30 ${y - 3} -12 ${y + 1}` : `M-12 ${y + 1}C30 ${y - 3} 70 ${y + 3} 112 ${y - 2}`
)

// Content leaves first, then the sweeps lift off bottom to top.
const CLOSE_TIME = 640

const SECTIONS = [
  { to: 'about', label: 'About' },
  { to: 'project', label: 'Project' },
  { to: 'contact', label: 'Contact' }
]

export const Navbar = () => {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [light, setLight] = useState(pathname === '/')
  const [mounted, setMounted] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const exit = useRef<ReturnType<typeof setTimeout>>()
  const pointerOpen = useRef(false)
  const [closing, setClosing] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    const update = () => {
      setScrolled(scrollY > 20)
      const surfaces = Array.from(
        document.querySelectorAll(
          '[data-hero-light],[data-about-light],[data-project-light],[data-contact-light],[data-footer-light]'
        )
      )
      setLight(
        surfaces.some((surface) => {
          const b = surface.getBoundingClientRect()

          return b.top <= 80 && b.bottom > 80
        })
      )
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const target = new URL(location.href).searchParams.get('section')
    const timer =
      target && ['hero', ...SECTIONS.map((s) => s.to)].includes(target)
        ? setTimeout(() => {
            scroller.scrollTo(target, { smooth: !reduced, duration: 750, offset: target === 'hero' ? 0 : -80 })
            history.replaceState(history.state, '', location.pathname)
          }, 150)
        : undefined

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      clearTimeout(timer)
    }
  }, [pathname, reduced])
  useEffect(() => {
    if (!isOpen) return
    const modal = dialog.current
    if (!modal) return
    const opener = toggle.current
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    modal.showModal()
    // Opened by tap or click: keep focus inside the dialog without drawing a keyboard ring on the close button.
    if (pointerOpen.current) modal.focus({ preventScroll: true })
    const desktop = window.matchMedia('(min-width:768px)')
    const resize = () => {
      if (desktop.matches) setIsOpen(false)
    }
    desktop.addEventListener('change', resize)

    return () => {
      clearTimeout(exit.current)
      setClosing(false)
      modal.close()
      document.body.style.overflow = overflow
      lenis?.start()
      desktop.removeEventListener('change', resize)
      opener?.focus({ preventScroll: true })
    }
  }, [isOpen, lenis])
  const close = () => {
    if (closing) return
    if (reduced || !dialog.current) {
      setIsOpen(false)

      return
    }
    // The paper is scratched away again, in reverse, before the dialog closes.
    setClosing(true)
    exit.current = setTimeout(() => setIsOpen(false), CLOSE_TIME)
  }

  return (
    <div className="navbar">
      <header className={cn(styles.header, scrolled && styles.scrolled, light && styles.light)}>
        <nav className={styles.nav} aria-label="Main navigation">
          <SectionLink to="hero" label="Wanfah Diva, back to top" className={styles.logo}>
            WD
          </SectionLink>
          <div className={styles.desktop}>
            {SECTIONS.map((item, index) => (
              <SectionLink key={item.to} to={item.to} className={styles.desktopLink}>
                <span>0{index + 1}.</span>
                {item.label}
              </SectionLink>
            ))}
          </div>
          <button
            type="button"
            ref={toggle}
            className={styles.toggle}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={(event) => {
              pointerOpen.current = event.detail > 0
              setIsOpen(true)
            }}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>
      {mounted &&
        createPortal(
          <dialog
            ref={dialog}
            id="mobile-navigation"
            className={styles.dialog}
            data-compact={scrolled}
            data-closing={closing || undefined}
            tabIndex={-1}
            aria-labelledby="menu-title"
            onKeyDown={(event) => {
              if (event.key !== 'Tab') return
              const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]'))
              if (!items.length) return
              // Safari can skip regular links with its default keyboard settings.
              event.preventDefault()
              const current = items.indexOf(document.activeElement as HTMLElement)
              const next = (current + (event.shiftKey ? -1 : 1) + items.length) % items.length
              items[next].focus()
            }}
            onCancel={(event) => {
              event.preventDefault()
              close()
            }}
          >
            {/* The page is painted over with a few broad brush sweeps as the menu opens. */}
            <svg className={styles.wash} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="menu-brush" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04 0.5" numOctaves="2" seed="4" />
                  <feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              <g filter="url(#menu-brush)" fill="none" strokeLinecap="round" strokeWidth="17">
                {WASH.map((d, index) => (
                  <path key={d} d={d} pathLength={1} style={{ animationDelay: `${index * 55}ms` }} />
                ))}
              </g>
              <rect className={styles.washFill} width="100" height="100" />
            </svg>
            <div className={styles.menuPage}>
              <div className={styles.menuTop}>
                <span className={styles.menuLogo}>WD</span>
                <button type="button" className={styles.close} aria-label="Close navigation menu" onClick={close} autoFocus>
                  <X size={20} strokeWidth={1.4} />
                </button>
              </div>
              <div className={styles.menuBody}>
                <p id="menu-title" className={styles.menuCaption}>
                  TABLE OF CONTENTS
                </p>
                <nav aria-label="Mobile navigation" className={styles.menuLinks}>
                  {SECTIONS.map((item, index) => (
                    <SectionLink key={item.to} to={item.to} className={styles.menuLink} onClick={() => setIsOpen(false)}>
                      <span className={styles.menuNumber}>0{index + 1}</span>
                      <span>{item.label}</span>
                      <ArrowUpRight size={23} strokeWidth={1.2} aria-hidden="true" />
                    </SectionLink>
                  ))}
                </nav>
              </div>
              <div className={styles.menuBottom}>
                <p className={styles.menuCaption}>LET’S START A CONVERSATION</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className={styles.menuEmail}>
                  {CONTACT_EMAIL}
                  <ArrowUpRight size={13} strokeWidth={1.3} aria-hidden="true" />
                </a>
                <div className={styles.menuSocials}>
                  {SOCIAL_LINKS.map((item) => (
                    <a key={item.label} href={item.link} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ))}
                </div>
                <p className={styles.menuColophon}>WANFAH DIVA / SOFTWARE DEVELOPER</p>
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </div>
  )
}
