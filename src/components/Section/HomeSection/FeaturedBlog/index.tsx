import { useEffect, useRef } from 'react'

import { BlogCard } from '@/components/Cards'
import ArrowLink from '@/components/Links/ArrowLink'

export const FeaturedBlog = () => {
  const sectionRef = useRef<any>(null)

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
          section.style.opacity = opacity
        } else {
          section.style.opacity = 1
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='mx-auto w-full max-w-5xl py-5 md:py-24' ref={sectionRef}>
      <div className='mb-7 flex w-full items-center justify-between'>
        <h1 className='w-24 text-2xl font-semibold uppercase'>Featured Blog</h1>
        <div className='-mb-9 h-full'>
          <ArrowLink href='/work' className='text-sm !no-underline'>
            <a>View All</a>
          </ArrowLink>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-x-8 gap-y-5'>
        {Array.from({ length: 4 }).map((_, index) => (
          <BlogCard key={index} id={index} />
        ))}
      </div>
    </div>
  )
}
