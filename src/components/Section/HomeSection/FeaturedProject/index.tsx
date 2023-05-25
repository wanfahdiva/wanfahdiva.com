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
    <ContainerLayout className='mx-auto mt-10 w-11/12 md:mt-0 md:h-screen md:w-full md:max-w-5xl md:py-5'>
      <div className='mb-7 flex w-full items-center justify-between'>
        <h1 className='text-xl font-semibold uppercase md:text-2xl'>
          Featured <br /> Work
        </h1>
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
