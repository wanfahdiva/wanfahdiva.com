'use client'

import { FileTextIcon } from 'lucide-react'
import Link from 'next/link'
import { InView } from 'react-intersection-observer'

import { TechLogo } from '@/components/atoms/icons'
import { Container } from '@/components/templates/container'

import { cn } from '@/lib/utils'

export const HeroLanding = () => (
  <Container name="hero" className="relative overflow-hidden">
    <InView triggerOnce rootMargin="-40% 0px">
      {({ inView, ref }) => (
        <section
          className={cn(
            'relative mx-7 flex h-[95vh] items-center justify-start md:mx-auto md:h-screen md:max-w-5xl md:py-10 overflow-hidden',
            inView && 'fade-in-start'
          )}
          ref={ref}
        >
          <div className="flex flex-col items-center justify-start mt-3 space-y-5 md:max-w-5xl">
            <div className="flex flex-col items-start justify-start w-full">
              <p className="inline font-medium" data-fade="3">
                Hi, my name is
              </p>
              <h1 className="text-4xl font-bold md:text-6xl" data-fade="5">
                Wanfah Diva,
              </h1>
              <h3 className="text-3xl font-bold text-primary-400 md:text-6xl" data-fade="7">
                I build things for the web.
              </h3>
            </div>
            <div className="flex flex-col items-start justify-start space-y-7" data-fade="8">
              <div className="w-full md:w-3/4">
                <p className="text-sm font-medium md:text-base">
                  I am a Software Developer specializing in Frontend Web Development with a keen focus on building accessible
                  and high-performance web applications. My expertise lies in creating user-friendly interfaces and ensuring
                  optimal performance across various devices and platforms.
                </p>
              </div>
              <div className="inline-flex items-center space-x-2 md:space-x-5" data-fade="10">
                <Link
                  href="/"
                  passHref
                  className="inline-flex items-center justify-center px-4 py-2 space-x-2 font-medium transition-colors duration-300 ease-in-out border-2 border-white rounded hover:bg-white hover:text-mirage"
                >
                  <FileTextIcon className="w-4 h-4" />
                  <span className="text-xs font-semibold md:text-sm">Resume</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute rounded c-scrolldown bottom-3 left-1/2 opacity-40 md:hidden">
            <div className="c-line" />
          </div>
        </section>
      )}
    </InView>
    <InView triggerOnce>
      {({ inView, ref }) => (
        <div
          className={cn('transition-opacity duration-300 ease-in delay-150 z-[-1]', inView ? 'opacity-100' : 'opacity-0')}
          ref={ref}
        >
          <TechLogo className="z-[-1]" data-fade="3" />
        </div>
      )}
    </InView>
  </Container>
)
