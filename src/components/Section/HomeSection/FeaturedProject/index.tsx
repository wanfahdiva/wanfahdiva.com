import React from 'react'
import InView from 'react-intersection-observer'

import { WorkCard } from '@/components/Cards'
import { ContainerLayout } from '@/components/Layout'
import ArrowLink from '@/components/Links/ArrowLink'

import { WorkMeta } from '@/api/work'

interface FeaturedProjectProps {
  data: WorkMeta[]
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ data }) => {
  return (
    <ContainerLayout className='mx-7 mt-10 md:mx-auto md:mt-0 md:h-screen md:w-full md:max-w-5xl md:py-5'>
      <InView triggerOnce rootMargin='-40% 0px'>
        {({ inView, ref }) => (
          <section ref={ref}>
            <div className='mb-7 flex w-full items-end justify-between'>
              <h1 className='text-lg font-semibold uppercase md:text-2xl'>
                Featured Work
              </h1>
              <div className='h-full'>
                <ArrowLink href='/work' className='text-sm !no-underline'>
                  <a>View All</a>
                </ArrowLink>
              </div>
            </div>
            <div className='flex flex-col space-y-3'>
              {data.map((item, index) => (
                <div key={index}>
                  <WorkCard keys={index} data={item} inView={inView} />
                </div>
              ))}
            </div>
          </section>
        )}
      </InView>
    </ContainerLayout>
  )
}
