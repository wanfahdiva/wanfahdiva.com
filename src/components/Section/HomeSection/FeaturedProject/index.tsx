import React, { useEffect, useRef } from 'react'

import { WorkCard } from '@/components/Cards'
import ArrowLink from '@/components/Links/ArrowLink'

import { WorkMeta } from '@/api/work'

interface FeaturedProjectProps {
  data: WorkMeta[]
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ data }) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current

      if (section) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY

        if (scrollY > sectionTop + sectionHeight - windowHeight) {
          const opacity =
            1 - (scrollY - (sectionTop + sectionHeight - windowHeight)) / 500
          section.style.opacity = opacity.toString()
        } else {
          section.style.opacity = '1'
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='mx-auto w-full max-w-5xl py-5 md:py-10' ref={sectionRef}>
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
    </div>
  )
}
