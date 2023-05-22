/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'

import { WorkMeta } from '@/api/work'

type WorkCardProps = {
  data: WorkMeta
}
export const WorkCard = ({ data }: WorkCardProps) => {
  return (
    <Link href={`/work/${data?.slug}`} passHref>
      <a className='group flex items-center space-x-4 border-t pt-5 pb-10'>
        <div className='relative h-44 w-64'>
          <Image
            src={data?.coverImage ? data.coverImage : '/images/bg-hero.jpg'}
            alt='profile'
            layout='fill'
            className='object-cover object-center transition-all duration-300 group-hover:scale-125'
          />
        </div>
        <div className='flex-1 flex-col space-y-3'>
          <h2 className='text-lg font-semibold uppercase'>{data?.title}</h2>
          <p className='pb-1.5 line-clamp-2'>{data?.excerpt}</p>
          <small>Tag: {data?.tags.join(', ')}</small>
        </div>
      </a>
    </Link>
  )
}
