import React from 'react'

import { WorkCard } from '@/components/Cards'
import { ContainerLayout } from '@/components/Layout'
import ArrowLink from '@/components/Links/ArrowLink'

import { WorkMeta } from '@/api/work'

interface FeaturedProjectProps {
  data: WorkMeta[]
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ data }) => {
  return (
    <ContainerLayout className='mx-auto w-full max-w-5xl py-5 md:py-10'>
      <div className='mb-7 flex w-full items-center justify-between'>
        <h1 className='w-24 text-2xl font-semibold uppercase'>Featured Work</h1>
        <div className='-mb-9 h-full'>
          <ArrowLink href='/work' className='text-sm !no-underline'>
            <a>View All</a>
          </ArrowLink>
        </div>
      </div>
      <div className='flex flex-col space-y-3'>
        {data.map((item, index) => (
          <WorkCard key={index} data={item} />
        ))}
      </div>
    </ContainerLayout>
  )
}
