'use client'

import { SOCIAL_LINKS } from '@/constants/social'
import { ArrowUp, ArrowUpRight } from 'lucide-react'

import { SectionLink } from '@/components/atoms/section-link'

import styles from './footer.module.css'

export const Footer = () => (
  <footer className={`footer ${styles.footer}`} data-footer-light>
    <div className={styles.inner}>
      <div className={styles.top}>
        <SectionLink to="hero" className={styles.name}>
          Wanfah Diva<span>SOFTWARE DEVELOPER</span>
        </SectionLink>
        <nav className={styles.socials} aria-label="Social links">
          {SOCIAL_LINKS.map((item) => (
            <a key={item.label} href={item.link} target="_blank" rel="noreferrer">
              {item.label}
              <ArrowUpRight size={11} strokeWidth={1.3} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Wanfah Diva</p>
        <span>MADE WITH CARE, DOWN TO THE DETAILS.</span>
        <SectionLink to="hero" className={styles.back}>
          BACK TO TOP
          <ArrowUp size={12} strokeWidth={1.4} aria-hidden="true" />
        </SectionLink>
      </div>
    </div>
  </footer>
)
