import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import clsxm from '@/lib/clsxm'

import ArrowLink from '@/components/Links/ArrowLink'

import { ProjectMeta } from '@/api/project'

type FeaturedProjectCardProps = {
  data: ProjectMeta
  index: number
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  data,
  index,
}) => {
  const [isLoading, setLoading] = useState(true)
  const [isHover, setHover] = useState(false)
  const tags = data.tags.map((tag) => `#${tag}`).join(' ')
  const isEven = index % 2 === 0

  return (
    <div
      className={clsx(
        'relative flex w-full flex-col space-y-2 md:space-x-10 ',
        isEven ? 'md:flex-row-reverse md:space-x-reverse' : 'md:flex-row'
      )}
    >
      <div className='flex items-center justify-start'>
        <div className='relative h-48 w-[34rem] md:h-[20rem]'>
          <Image
            src={`${
              data.coverImage
                ? data.coverImage
                : 'https://dummyimage.com/600x400/ffffff/000000.png'
            }`}
            layout='fill'
            alt={data.title}
            className={clsxm(
              'opacity-85 object-cover object-top transition-all ease-in-out md:rounded',
              isLoading
                ? 'scale-110 blur-2xl grayscale duration-700'
                : 'scale-100 blur-0 grayscale-0 duration-300'
            )}
            onLoadingComplete={() => setLoading(false)}
          />
          <p className='bg-primary-700 absolute right-0 top-0 block rounded-bl bg-opacity-90 px-1.5 text-sm text-white md:-mt-6 md:hidden'>
            Featured Project
          </p>
          <div
            className={clsx(
              'absolute left-0 top-0 hidden h-full w-full bg-black transition-all duration-300 ease-in-out md:block',
              isHover ? 'bg-opacity-0' : 'bg-opacity-70'
            )}
          />
        </div>
      </div>
      <div
        className={clsx(
          'flex w-full flex-col justify-center md:space-y-3',
          isEven ? 'items-start' : 'items-end'
        )}
      >
        <h4 className='hidden bg-white px-1 text-sm text-black md:-mt-6 md:block'>
          Featured Project
        </h4>
        <div className='z-20 flex flex-col space-y-2 py-4 md:w-full md:rounded-t md:p-0 md:pb-6 md:pt-4'>
          <h2
            className={clsx(
              'text-lg font-semibold md:text-xl',
              isEven ? 'text-left' : 'md:text-right'
            )}
          >
            {data.title}
          </h2>
          <p
            className={clsx(
              'text-primary-400 line-clamp-2 text-sm md:text-base ',
              isEven ? 'text-left' : 'md:pr-1 md:text-right'
            )}
          >
            {data.excerpt}
          </p>
          <small
            className={clsx(
              'text-primary-400 flex space-x-2 text-sm',
              isEven ? 'justify-start' : 'md:justify-end'
            )}
          >
            {tags}
          </small>
          <div
            className={clsx(
              'flex pt-4',
              isEven ? 'justify-start' : 'md:justify-end'
            )}
          >
            <ArrowLink
              href={`/project/${data.slug}`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <a className='text-right text-sm'>Read More</a>
            </ArrowLink>
          </div>
        </div>
      </div>
    </div>
  )
}
