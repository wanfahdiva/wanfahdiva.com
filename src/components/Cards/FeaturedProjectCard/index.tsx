import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import ArrowLink from '@/components/Links/ArrowLink'

import { WorkMeta } from '@/api/work'

type FeaturedProjectCardProps = {
  data: WorkMeta
  index: number
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  data,
  index,
}) => {
  const tags = data.tags.map((tag) => `#${tag}`).join(' ')
  const isEven = index % 2 === 0
  return (
    <div
      className={clsx(
        'relative flex w-full flex-col -space-y-3.5',
        isEven ? 'md:flex-row-reverse' : 'md:flex-row'
      )}
    >
      <div className='flex items-center justify-start rounded-t border-2 md:w-2/3 md:border-0'>
        <Link href={`/work/${data.slug}`} passHref>
          <a className='group relative h-52 w-full md:h-[22rem]'>
            <Image
              src={`${
                data?.coverImage
                  ? data.coverImage
                  : 'https://dummyimage.com/600x400/ffffff/000000.png'
              }`}
              alt={data?.title}
              className='object-cover object-top transition-all duration-300 md:rounded'
              layout='fill'
              placeholder='blur'
              loading='lazy'
              blurDataURL={data.blurUrl}
            />
            <h4 className='absolute left-2 bottom-2 block bg-black bg-opacity-90 px-1 text-sm text-white backdrop-blur-sm md:-mt-6 md:hidden'>
              Featured Project
            </h4>
            <div className='absolute top-0 left-0 hidden h-full w-full bg-black bg-opacity-90 transition-all duration-300 ease-in-out group-hover:bg-opacity-0 md:block'></div>
          </a>
        </Link>
      </div>
      <div
        className={clsx(
          'flex w-full flex-col justify-center  space-y-3 md:w-1/2',
          isEven ? 'items-start' : 'items-end'
        )}
      >
        <h4 className='hidden bg-white px-1 text-sm text-black md:-mt-6 md:block'>
          Featured Project
        </h4>
        <div className='z-20 flex flex-col space-y-2 overflow-hidden rounded rounded-t-none border-2 bg-black bg-opacity-90 p-4 backdrop-blur-sm md:w-[120%] md:rounded-t md:px-6 md:pb-6 md:pt-4'>
          <h2
            className={clsx(
              'text-xl font-semibold',
              isEven ? 'text-left' : 'md:text-right'
            )}
          >
            {data?.title}
          </h2>
          <p
            className={clsx(
              'line-clamp-2 md:line-clamp-2',
              isEven ? 'text-left' : 'md:text-right'
            )}
          >
            {data?.excerpt}
          </p>
          <small
            className={clsx(
              'flex space-x-2 text-sm',
              isEven ? 'justify-start' : 'md:justify-end'
            )}
          >
            {tags}
          </small>
          <div className='flex justify-end pt-4 md:hidden'>
            <ArrowLink href='/work'>
              <a className='text-right text-sm'>Read More</a>
            </ArrowLink>
          </div>
        </div>
      </div>
    </div>
  )
}
