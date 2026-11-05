'use client'

import { CONTACT_EMAIL } from '@/constants/social'
import { useEditorialReveal } from '@/hooks/use-editorial-reveal'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components/templates/container'

import styles from './contact-landing.module.css'

export const ContactLanding = () => {
  const section = useRef<HTMLElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  useEditorialReveal(section)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copyEmail = async () => {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    timer.current = setTimeout(() => setCopyState('idle'), 3000)
  }

  return (
    <Container name="contact" className={styles.contact}>
      <section ref={section} id="contact" data-contact-light className={styles.inner} aria-labelledby="contact-title">
        <header className={styles.chapter} data-editorial-reveal>
          <p>
            <span>03</span>
            <span className={styles.rule} />
            CONTACT
          </p>
          <span>THE NEXT CHAPTER</span>
        </header>
        <div className={styles.content}>
          <div className={styles.invitation}>
            <p className={styles.overline} data-editorial-reveal>
              A NOTE, AN IDEA, A NEW BEGINNING.
            </p>
            <h2 id="contact-title" data-editorial-reveal data-reveal-delay="100">
              Good things start
              <br />
              with a <span>conversation.</span>
            </h2>
            <p className={styles.intro} data-editorial-reveal data-reveal-delay="200">
              Have a project in mind, a question, or just a hello?
              <br />
              I’d be glad to hear from you.
            </p>
          </div>
          <div className={styles.details} data-editorial-reveal>
            <p className={styles.overline}>WRITE TO ME</p>
            <div className={styles.emailRow}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email}>
                {CONTACT_EMAIL}
                <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={styles.copy}
                aria-label={copyState === 'copied' ? 'Email address copied' : 'Copy email address'}
                title={copyState === 'copied' ? 'Copied' : 'Copy email address'}
              >
                {copyState === 'copied' ? <Check size={15} strokeWidth={1.5} /> : <Copy size={15} strokeWidth={1.5} />}
              </button>
            </div>
            <p className={styles.copyFeedback} role="status" aria-live="polite">
              {copyState === 'copied'
                ? 'Email address copied.'
                : copyState === 'failed'
                  ? 'Please select the email address or use the email link.'
                  : 'A good place to start.'}
            </p>
          </div>
        </div>
        <div className={styles.signoff} data-editorial-reveal>
          <span>THANK YOU FOR STOPPING BY.</span>
        </div>
      </section>
    </Container>
  )
}
