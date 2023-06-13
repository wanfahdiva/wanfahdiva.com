import clsx from 'clsx'
import React from 'react'
import InView from 'react-intersection-observer'

import { FeaturedProjectCard } from '@/components/Cards'
import { ContainerLayout } from '@/components/Layout'
import ButtonLink from '@/components/Links/ButtonLink'

import { WorkMeta } from '@/api/get-work'

interface SectionProjectProps {
  data: WorkMeta[]
}

export const SectionProject: React.FC<SectionProjectProps> = ({ data }) => {
  return (
    <ContainerLayout
      className='mx-7 mt-10 py-20 md:mx-auto md:mt-0 md:w-full md:max-w-5xl'
      name='work'
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <section ref={ref}>
            <div className='mb-7 flex w-full items-center space-x-5'>
              <h1 className='flex-none text-xl font-semibold uppercase md:text-2xl'>
                <span className='opacity-75'>03.</span> Some Things I’ve Built
              </h1>
              <div
                className={clsx(
                  'h-px flex-auto bg-gray-300 md:flex-none',
                  inView
                    ? 'w-full flex-1 transition-all duration-300 ease-in md:w-1/4 md:flex-none'
                    : 'w-0'
                )}
              />
            </div>
            <div className='flex flex-col space-y-10 py-5 md:space-y-20'>
              {data.map((item, index) => (
                <div key={index}>
                  <FeaturedProjectCard data={item} index={index} />
                </div>
              ))}
            </div>
            <div className='mt-10 flex items-center justify-center pt-10'>
              <div className='mx-auto w-11/12 text-center md:w-1/2'>
                <h3 className='font-semibold !text-[#A8A8A6] md:text-xl '>
                  Let`s see my other project
                </h3>
                <ButtonLink
                  href='/work'
                  className='mt-5 text-xs md:text-sm'
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
