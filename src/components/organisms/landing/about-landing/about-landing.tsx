'use client'

import { useEditorialReveal } from '@/hooks/use-editorial-reveal'
import stack from '@/shared/jsons/stack.json'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

import { PaintReveal } from '@/components/atoms/paint-reveal'
import { SectionLink } from '@/components/atoms/section-link'
import { Container } from '@/components/templates/container'

import styles from './about-landing.module.css'

export const AboutLanding = () => {
  const section = useRef<HTMLElement>(null)
  useEditorialReveal(section)

  return (
    <Container name="about" className={styles.about}>
      <section ref={section} id="about" data-about-light aria-labelledby="about-title" className={styles.inner}>
        <header className={styles.chapter} data-editorial-reveal>
          <p>
            <span>01</span>
            <span className={styles.chapterRule} />
            ABOUT
          </p>
          <span className={styles.marginNote}>THE PERSON BEHIND THE WORK</span>
        </header>
        <div className={styles.spread}>
          <figure className={styles.portrait} data-editorial-reveal>
            <div className={styles.print}>
              <div className={styles.photo}>
                <Image
                  src="/static/images/me.jpg"
                  alt="Portrait of Wanfah Diva"
                  fill
                  sizes="(max-width: 600px) 75vw, (max-width: 900px) 36vw, 320px"
                  quality={80}
                  className={styles.image}
                />
                <PaintReveal color="#fbfbfa" seed={2} rootMargin="0px 0px -40% 0px" threshold={0} delay={200} />
              </div>
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.name}>Wanfah Diva</span>
              <span className={styles.captionRole}>SOFTWARE DEVELOPER</span>
            </figcaption>
          </figure>
          <div className={styles.story}>
            <p className={styles.overline} data-editorial-reveal data-reveal-delay="100">
              A FEW WORDS, IN MY OWN WAY.
            </p>
            <h2 id="about-title" className={styles.title} data-editorial-reveal data-reveal-delay="200">
              A little about
              <br />
              <span>how I work.</span>
            </h2>
            <p className={styles.lead} data-editorial-reveal data-reveal-delay="300">
              My name is Wanfah. I’m a software developer focused on frontend web development. I enjoy turning ideas into
              interfaces that feel clear, accessible, and easy to use.
            </p>
            <p className={styles.body} data-editorial-reveal>
              I work with HTML, CSS, JavaScript, and frameworks like React and Vue.js. I’ve had the privilege of working with{' '}
              <a href="https://sawala.tech" target="_blank" rel="noreferrer">
                Sawala Tech
                <ArrowUpRight size={12} strokeWidth={1.4} />
              </a>
              , building web applications for a variety of clients.
            </p>
            <p className={styles.body} data-editorial-reveal>
              I care about the details that make an interface feel right: how it responds, how it reads, and how well it
              works across devices. For me, good development brings those small decisions together.
            </p>
            <dl className={styles.notes} data-editorial-reveal>
              <div>
                <dt>MY FOCUS</dt>
                <dd>Accessible interfaces.</dd>
              </div>
              <div>
                <dt>MY APPROACH</dt>
                <dd>Care in the details.</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className={styles.toolset}>
          <div className={styles.toolsIntro} data-editorial-reveal>
            <p className={styles.overline}>THE EVERYDAY TOOLKIT</p>
            <h3>
              Tools of
              <br />
              <span>the trade.</span>
            </h3>
            <p>A few technologies I work with.</p>
          </div>
          <ul className={styles.tools} aria-label="Technologies I work with">
            {stack.map((tool, index) => (
              <li key={tool.title} data-editorial-reveal data-reveal-delay={(index % 2) * 100}>
                <a href={tool.url} target="_blank" rel="noreferrer">
                  <span className={styles.toolIndex}>0{index + 1}</span>
                  <span className={styles.toolName}>{tool.title}</span>
                  <ArrowUpRight size={13} strokeWidth={1.3} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <footer className={styles.pageEnd} data-editorial-reveal>
          <span>A LITTLE CONTEXT. A LOT OF CURIOSITY.</span>
          <SectionLink to="project">
            NEXT: SELECTED WORK
            <ArrowUpRight size={12} strokeWidth={1.4} />
          </SectionLink>
        </footer>
      </section>
    </Container>
  )
}
