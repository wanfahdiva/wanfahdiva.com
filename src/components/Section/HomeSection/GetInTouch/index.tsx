import clsx from 'clsx'
import InView from 'react-intersection-observer'
import { Element } from 'react-scroll'

import ButtonLink from '@/components/Links/ButtonLink'

export const SectionGetInTouch: React.FC = () => {
  return (
    <Element name='contact'>
      <InView triggerOnce rootMargin='-40% 0px'>
        {({ inView, ref }) => (
          <div
            className={clsx(
              'mx-7 flex h-[60vh] items-center justify-center md:mx-auto md:mt-0 md:h-screen md:w-full md:max-w-6xl',
              inView && 'fade-in-start'
            )}
            ref={ref}
          >
            <div
              className='flex max-w-xl flex-col items-center justify-center space-y-5'
              data-fade='5'
            >
              <h1 className='text-center text-xl font-semibold uppercase md:text-2xl'>
                <span className='opacity-75'>04.</span> Get In Touch
              </h1>
              <p className='text-primary-400 text-center text-sm md:text-lg'>
                Although I`m not currently looking for any new opportunities, my
                inbox is always open. Whether you have a question or just want
                to say hi, I`ll try my best to get back to you!
              </p>
              <ButtonLink
                href='maito:wanfahdivaa@gmail.com'
                variant='light'
                className='text-xs md:text-sm'
              >
                Say Hello
              </ButtonLink>
            </div>
          </div>
        )}
      </InView>
    </Element>
  )
}
