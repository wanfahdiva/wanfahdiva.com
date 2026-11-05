'use client'

import { useHeroExit } from '@/hooks/use-hero-exit'
import { ArrowDown, ArrowUpRight, FileTextIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

import { SectionLink } from '@/components/atoms/section-link'
import { Container } from '@/components/templates/container'

import styles from './hero-landing.module.css'
import { InterfaceWorkbench } from './interface-workbench/interface-workbench'

export const HeroLanding = () => {
  const section = useRef<HTMLElement>(null)
  useHeroExit(section)

  return (
    <Container name="hero" className={styles.hero}>
      <section ref={section} className={styles.inner} data-hero-light aria-labelledby="hero-title">
        <div className={styles.sceneLayer}>
          <div className={styles.drift} data-hero-exit="scene">
            <InterfaceWorkbench />
          </div>
        </div>
        <div className={styles.copy} data-hero-exit="copy">
          <p className={styles.eyebrow}>
            <span className={styles.rule} />
            WANFAH DIVA<span className={styles.role}>SOFTWARE DEVELOPER</span>
          </p>
          <h1 id="hero-title" className={styles.title}>
            I build things
            <br />
            for the <span>web.</span>
          </h1>
          <p className={styles.description}>
            Thoughtful interfaces. Accessible experiences.
            <br className={styles.desktopBreak} /> I turn ideas into things people love to use.
          </p>
          <div className={styles.links}>
            <SectionLink to="project" className={styles.primaryLink}>
              Explore my work
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </SectionLink>
            <Link
              href="https://drive.google.com/file/d/1kfcXSQVZMR-8IK_AIwPXdVOX6nk1DCxv/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className={styles.resume}
            >
              <FileTextIcon size={14} strokeWidth={1.4} />
              Resume
            </Link>
          </div>
        </div>
        <div className={styles.footnote} data-hero-exit="footnote">
          <SectionLink to="project">
            <ArrowDown size={13} strokeWidth={1.5} />
            SCROLL TO EXPLORE
          </SectionLink>
          <span>FROM AN IDEA TO AN INTERFACE.</span>
        </div>
      </section>
    </Container>
  )
}
