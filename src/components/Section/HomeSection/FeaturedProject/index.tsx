import clsx from 'clsx'
import React from 'react'
import InView from 'react-intersection-observer'

import { FeaturedProjectCard } from '@/components/Cards'
import { ContainerLayout } from '@/components/Layout'
import ButtonLink from '@/components/Links/ButtonLink'

import { WorkMeta } from '@/api/work'

interface FeaturedProjectProps {
  data: WorkMeta[]
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ data }) => {
  return (
    <ContainerLayout className='mx-7 mt-10 py-20 md:mx-auto md:mt-0 md:w-full md:max-w-5xl md:pb-0 md:pt-20'>
      <InView triggerOnce rootMargin='-40% 0px'>
        {({ inView, ref }) => (
          <section ref={ref}>
            <div className='mb-7 flex w-full items-center space-x-5'>
              <h1 className='text-lg font-semibold uppercase md:text-2xl'>
                Some Things I’ve Built
              </h1>
              <div
                className={clsx(
                  'h-px bg-gray-300',
                  inView ? 'w-2/6 transition-all duration-300 ease-in' : 'w-0'
                )}
              ></div>
            </div>
            <div className='flex flex-col space-y-10 py-5 md:space-y-20'>
              {data.map((item, index) => (
                <div key={index}>
                  <FeaturedProjectCard data={item} index={index} />
                </div>
              ))}
            </div>
            <div className='mt-10 flex items-center justify-center py-10'>
              <div className='mx-auto w-11/12 text-center md:w-1/2'>
                <h3 className='md:text-2xl'>
                  Take a look at what i can do for you
                </h3>
                <ButtonLink
                  href='/work'
                  className='mt-5 text-sm'
                  variant='light'
                >
                  All Work
                </ButtonLink>
              </div>
            </div>
          </section>
        )}
      </InView>
    </ContainerLayout>
  )
}
