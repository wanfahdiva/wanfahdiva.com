'use client'

import { useEditorialReveal } from '@/hooks/use-editorial-reveal'
import projects from '@/shared/jsons/project.json'
import { useScroll } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

import { SectionLink } from '@/components/atoms/section-link'
import { LandingProjectCard } from '@/components/molecules/card/landing-project-card'
import { Container } from '@/components/templates/container'

import styles from './project-landing.module.css'

const CATEGORIES = [
  'Architecture / Company profile',
  'Creative agency / Company profile',
  'Education / Learning platform',
  'Medical event / Registration'
]

export const ProjectLanding = () => {
  const section = useRef<HTMLElement>(null)
  const stack = useRef<HTMLDivElement>(null)
  useEditorialReveal(section)
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] })

  return (
    <Container name="project" className={styles.projects}>
      <section
        ref={section}
        id="selected-projects"
        data-project-light
        aria-labelledby="projects-title"
        className={styles.section}
      >
        <header className={styles.header}>
          <div className={styles.chapter} data-editorial-reveal>
            <p>
              <span>02</span>
              <span className={styles.rule} />
              SELECTED WORK
            </p>
            <span>A FEW THINGS I’VE HELPED BRING TO LIFE</span>
          </div>
          <div className={styles.intro}>
            <h2 id="projects-title" data-editorial-reveal>
              A selection of
              <br />
              <span>things built.</span>
            </h2>
            <div className={styles.introNote} data-editorial-reveal data-reveal-delay="100">
              <p>
                Different ideas. A shared attention to detail.
                <br />A few web projects from my practice.
              </p>
              <span>
                <ArrowDown size={12} strokeWidth={1.4} />
                SCROLL THROUGH THE COLLECTION
              </span>
            </div>
          </div>
        </header>
        <div ref={stack} className={styles.stack} role="list" aria-label="Selected projects">
          {projects.map((project, index) => (
            <LandingProjectCard
              key={project.title}
              index={index}
              total={projects.length}
              title={project.title}
              description={project.description}
              src={project.src}
              url={project.link}
              category={CATEGORIES[index]}
              progress={scrollYProgress}
              range={[index / projects.length, Math.min(1, (index + 1) / (projects.length - 1))]}
              targetScale={1 - (projects.length - 1 - index) * 0.025}
            />
          ))}
        </div>
        <footer className={styles.end}>
          <span>END OF THE COLLECTION / 0{projects.length} PROJECTS</span>
          <SectionLink to="contact">
            HAVE SOMETHING IN MIND?
            <ArrowUpRight size={13} strokeWidth={1.4} />
          </SectionLink>
        </footer>
      </section>
    </Container>
  )
}
