import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import InView from 'react-intersection-observer'

import { FeaturedProjectCard } from '@/components/Cards'
import { ContainerLayout } from '@/components/Layout'

import { ProjectMeta } from '@/api/project'

interface SectionProjectProps {
  data: ProjectMeta[]
}

export const SectionProject: React.FC<SectionProjectProps> = ({ data }) => {
  if (!data) return null
  return (
    <ContainerLayout
      className={clsx(
        'mx-7 mt-10 pt-20 md:mx-auto md:mt-0 md:w-full md:max-w-5xl md:pt-20'
      )}
      name='project'
    >
      <InView triggerOnce>
        {({ inView, ref }) => (
          <section ref={ref}>
            <div className='mb-7 flex w-full items-center space-x-5'>
              <h1 className='flex-none text-xl font-semibold uppercase md:text-2xl'>
                <span className='opacity-75'>02.</span> Some Things I’ve Built
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
                <FeaturedProjectCard data={item} index={index} key={index} />
              ))}
            </div>
            <div className='flex items-center justify-center pt-10 md:mt-10'>
              <div className='mx-auto flex w-11/12 items-center justify-center space-x-2 text-center md:w-1/2'>
                <Link href='/project'>
                  <a className='text-sm text-white underline decoration-neutral-600 decoration-2 underline-offset-2 md:text-base'>
                    View all projects
                  </a>
                </Link>
              </div>
            </div>
          </section>
        )}
      </InView>
    </ContainerLayout>
  )
}
