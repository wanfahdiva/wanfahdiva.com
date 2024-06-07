'use client'

import stack from '@/shared/jsons/stack.json'
import { InView } from 'react-intersection-observer'

import NextImage from '@/components/atoms/next-image'
import { Container } from '@/components/templates/container'

import { cn } from '@/lib/utils'

export const AboutLanding = () => (
  <Container name="about">
    <InView triggerOnce rootMargin="-40% 0px">
      {({ inView, ref }) => (
        <section
          className={cn('mx-7 mt-10 pt-20 md:mx-auto md:mt-0 md:w-full md:max-w-4xl md:py-20', inView && 'fade-in-start')}
          ref={ref}
        >
          <div className="w-full">
            <div className="flex items-center w-full space-x-5 mb-7" data-fade="4">
              <h1 className="flex-none text-xl font-semibold uppercase md:text-2xl">
                <span className="opacity-75">01.</span> About
              </h1>
              <div
                className={cn(
                  'h-0.5 flex-auto bg-cement md:flex-none',
                  inView ? 'w-full flex-1 transition-all delay-500 duration-300 ease-in md:w-1/4 md:flex-none' : 'w-0'
                )}
              />
            </div>
            <div className="relative items-center justify-center hidden float-right mt-2 ml-7 md:flex" data-fade="9">
              <div className="relative h-[258px] w-[175px] md:h-[358px] md:w-[265px] about-image">
                <NextImage src="/static/images/me.jpg" alt="me" layout="fill" />
              </div>
              <span className="!font-montglades absolute translate-y-24 -rotate-6 transform text-2xl font-medium md:translate-y-32 text-off-white [text-shadow:_1.5px_1.25px_#a1a1aa]">
                Wanfah Diva
              </span>
            </div>
            <div data-fade="6">
              <p className="mt-5 text-sm text-justify indent-7 md:text-base">
                I am a frontend developer with 3+ years of experience in the software industry. I have skills in HTML, CSS,
                and JavaScript, and experience using frameworks like React and Vue.js. I am also familiar with working in
                teams and following modern software development methodologies. My passion lies in delivering engaging and
                functional user experiences through web application interfaces.
                <br />
                <br />
                Fast-forward to today, I have had the privilege of working at &nbsp;
                <a
                  href="https://sawala.tech"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-white underline decoration-neutral-600 decoration-2 underline-offset-2 md:text-base"
                >
                  PT. Sawala Technology Indonesia (Sawala Tech)
                </a>
                . My main focus now is building accessible and high-performance web applications for a variety of clients.
              </p>
            </div>
            <div className="mt-5" data-fade="8">
              <p className="text-sm md:text-base">Here are a few technologies I’ve been working with recently:</p>
              <div className="grid grid-cols-2 grid-rows-3" data-fade="10">
                {stack.map((item, index) => (
                  <div key={index}>
                    -&nbsp;
                    <a
                      href={item.url}
                      rel="noreferrer"
                      target="_blank"
                      className="text-sm font-semibold text-white underline decoration-neutral-600 decoration-2 underline-offset-2 md:text-base"
                    >
                      {item.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:hidden md:pt-10">
            <div className="relative flex flex-col items-center justify-center max-w-6xl mx-auto my-20 md:-mt-10 md:h-screen">
              {Array.from({ length: 4 }, (_, i) => (
                <div data-fade={4 + i} key={i}>
                  <p
                    data-fade={4 + i}
                    key={i}
                    className={cn(
                      '!font-poltawski -ml-5 text-7xl italic md:text-[7rem]',
                      i != 0 ? 'custom-stroke text-transparent opacity-40' : '!opacity-70 text-off-white'
                    )}
                  >
                    PROFILE
                  </p>
                </div>
              ))}
              <div
                className="absolute h-[258px] w-[175px] !rotate-[9deg] md:h-[358px] md:w-[265px] about-image"
                data-fade="9"
              >
                <NextImage src="/static/images/me.jpg" alt="me" layout="fill" />
              </div>
              <div data-fade="12" className="flex justify-center w-full h-full">
                <span className="!font-montglades absolute -translate-y-20 -rotate-6 transform text-2xl font-medium md:text-5xl">
                  Wanfah Diva
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </InView>
  </Container>
)
