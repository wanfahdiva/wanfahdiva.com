import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

import clsxm from '@/lib/clsxm'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout'

import { ContainerLayout } from '@/components/Layout'
import ArrowLink from '@/components/Links/ArrowLink'

import { ProjectMeta } from '@/api/project'

gsap.registerPlugin(ScrollTrigger)

interface SectionProjectProps {
  data: ProjectMeta[]
}

export const SectionProject: React.FC<SectionProjectProps> = ({ data }) => {
  const galeryRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const dummy = 'https://dummyimage.com/600x400/ffffff/000000.png'

  useIsomorphicLayoutEffect(() => {
    const details = gsap.utils.toArray(
      '.desktopContentSection:not(:first-child)'
    ) as HTMLElement[]
    const photos = gsap.utils.toArray(
      '.desktopPhoto:not(:first-child)'
    ) as HTMLElement[]

    gsap.set(photos, { opacity: 0, scale: 0.25, filter: 'grayscale(100%)' })

    const allPhotos = gsap.utils.toArray('.desktopPhoto') as HTMLElement[]
    const mm = gsap.matchMedia()

    mm.add('(min-width: 600px)', () => {
      // console.log('dekstop')
      ScrollTrigger.create({
        trigger: galeryRef.current,
        start: 'top top',
        end: 'bottom bottom',
        // pin: rightRef.current // disable bcuz not working
      })

      details.forEach((detail, index) => {
        const wrapper = detail.querySelector('.wrapper')
        const animation = gsap
          .timeline()
          .to(photos[index], {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 1,
            filter: 'grayscale(0%)',
          })
          .set(allPhotos[index], { autoAlpha: 0 })

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top 80%',
          end: 'center 50%',
          animation: animation,
          scrub: true,
          // markers: true,
        })
      })

      return () => {
        // console.log('mobile')
      }
    })
  }, [])
  if (!data) return null
  return (
    <ContainerLayout name='project' className='mt-10'>
      <div className='mx-7 flex md:mx-auto md:max-w-5xl' ref={galeryRef}>
        <div className='hidden w-1/2 md:block'>
          <div className='pr-10'>
            {data.map((item, index) => {
              const tags = item.tags.map((tag) => `#${tag}`).join(' ')
              return (
                <div className='desktopContentSection' key={index}>
                  <div className='wrapper z-20 flex flex-col space-y-2 rounded-t py-4 md:w-full md:p-0 md:pb-6 md:pt-4'>
                    <h1 className='text-lg font-semibold md:text-3xl'>
                      {item.title}
                    </h1>
                    <p className='line-clamp-3 text-sm md:pr-1  md:text-base'>
                      {item.excerpt}
                    </p>
                    <small className='flex space-x-2 text-sm'>{tags}</small>
                    <div className='flex pt-4'>
                      <ArrowLink
                        href={`/project/${item.slug}`}
                        className='text-right text-sm'
                      >
                        Read More
                      </ArrowLink>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className='top-2 flex w-full flex-col items-center justify-center md:sticky md:h-screen md:w-1/2'
          ref={rightRef}
        >
          {/* mobile content */}
          <div className='mobileContent'>
            {data.map((item, index) => {
              const tags = item.tags.map((tag) => `#${tag}`).join(' ')
              return (
                <div key={index}>
                  <div className='mobilePhoto relative'>
                    <Image
                      src={item.coverImage ?? dummy}
                      layout='fill'
                      className='rounded'
                      alt={item.title}
                    />
                  </div>
                  <h1 className='py-4 text-2xl'>{item.title}</h1>
                  <p className='mb-2 line-clamp-2 text-lg'>{item.excerpt}</p>
                  <small className='flex space-x-2 text-sm'>{tags}</small>
                  <div className='flex pt-4'>
                    <ArrowLink
                      href={`/project/${item.slug}`}
                      className='text-right text-sm'
                    >
                      Read More
                    </ArrowLink>
                  </div>
                </div>
              )
            })}
          </div>

          {/* desktop content */}
          <div className='desktopPhotos'>
            {data.map((item, index) => (
              <div className='desktopPhoto p-2' key={index}>
                <div className='relative h-full w-full rounded-xl object-cover object-top'>
                  <Image
                    src={item.coverImage ?? dummy}
                    layout='fill'
                    alt={item.title}
                    className={clsxm(
                      'opacity-85 rounded object-cover object-top',
                      loading
                        ? 'scale-110 blur-2xl grayscale duration-700'
                        : 'scale-100 blur-0 grayscale-0 duration-300'
                    )}
                    onLoadingComplete={() => setLoading(false)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center pt-10'>
        <div className='mx-auto flex w-11/12 items-center justify-center space-x-2 text-center md:w-1/2'>
          <Link href='/project'>
            <a className='text-sm text-white underline decoration-neutral-600 decoration-2 underline-offset-2 md:text-base'>
              View all projects
            </a>
          </Link>
        </div>
      </div>
    </ContainerLayout>
  )
}
