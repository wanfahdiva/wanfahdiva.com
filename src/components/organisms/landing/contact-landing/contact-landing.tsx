'use client'

import { InView } from 'react-intersection-observer'

import { Container } from '@/components/templates/container'

import { cn } from '@/lib/utils'

export const ContactLanding = () => (
  <Container name="contact">
    <InView triggerOnce rootMargin="-40% 0px">
      {({ inView, ref }) => (
        <div
          className={cn(
            'mx-7 flex h-[60vh] items-center justify-center md:mx-auto md:mt-0 md:h-screen md:w-full md:max-w-6xl',
            inView && 'fade-in-start'
          )}
          ref={ref}
        >
          <div className="flex flex-col items-center justify-center max-w-3xl space-y-5" data-fade="5">
            <h1 className="text-xl font-semibold text-center uppercase md:text-2xl">
              <span className="text-cement">03.</span> Get In Touch
            </h1>
            <p className="text-sm text-center md:text-base">
              While I&apos;m always excited to meet new people and explore interesting conversations, I&apos;m also open to
              new opportunities. Whether you have a question, an idea, or just want to say hi, feel free to drop me a
              message. My inbox is always open, and I&apos;ll do my best to get back to you!
            </p>
            <a
              href="maito:wanfahdivaa@gmail.com"
              className="inline-flex items-center justify-center px-4 py-2 space-x-2 text-xs font-medium transition-colors duration-300 ease-in-out border-2 border-white rounded md:text-sm hover:bg-white hover:text-mirage"
            >
              Say Hello
            </a>
          </div>
        </div>
      )}
    </InView>
  </Container>
)
