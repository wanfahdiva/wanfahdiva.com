'use client'

import projects from '@/shared/jsons/project.json'
import { useScroll } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import { InView } from 'react-intersection-observer'
import { Element } from 'react-scroll'

import { LandingProjectCard } from '@/components/molecules/card/landing-project-card'

import { cn } from '@/lib/utils'

export const ProjectLanding = () => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <InView triggerOnce rootMargin="-40% 0px">
      {({ inView, ref }) => (
        <section ref={ref} className={cn('', inView && 'fade-in-start')}>
          <Element name="project" data-fade="3">
            <div ref={container} className="md:mt-[30vh]">
              {projects.map((project, index) => {
                const targetScale = 1 - (projects.length - index) * 0.05

                return (
                  <LandingProjectCard
                    key={index}
                    index={index}
                    title={project.title}
                    description={project.description}
                    src={project.src}
                    url={project.link}
                    progress={scrollYProgress}
                    range={[index * 0.25, 1]}
                    targetScale={targetScale}
                  />
                )
              })}
            </div>
          </Element>
        </section>
      )}
    </InView>
  )
}
