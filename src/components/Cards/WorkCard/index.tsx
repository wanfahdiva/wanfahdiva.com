import Image from 'next/image'

import ArrowLink from '@/components/Links/ArrowLink'

import { WorkMeta } from '@/api/get-work'

type WorkCardProps = {
  data: WorkMeta
}

export const WorkCard: React.FC<WorkCardProps> = ({ data }) => {
  const tags = data.tags.map((tag) => `#${tag}`).join(' ')
  return (
    <div className='flex w-full flex-col space-y-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl'>{data.title}</h2>
        <small className=''>{data.date}</small>
      </div>
      <div className='relative h-48 w-full rounded-t'>
        <Image
          src={
            data?.coverImage
              ? data?.coverImage
              : 'https://dummyimage.com/600x400/ffffff/000000.png'
          }
          alt={data?.title}
          layout='fill'
          objectFit='cover'
          objectPosition='top'
          placeholder='blur'
          loading='lazy'
          blurDataURL={data.blurUrl}
        />
      </div>
      <div className=''>
        <p className='text-justify text-sm line-clamp-3'>{data.excerpt}</p>
        <small className='flex space-x-2 pt-2 text-sm'>{tags}</small>
        <div className='flex justify-end pt-6'>
          <ArrowLink href={`/work/${data.slug}`} className='text-sm'>
            Read More
          </ArrowLink>
        </div>
      </div>
      <div className='mx-auto h-px w-full bg-gray-400 md:w-11/12'></div>
    </div>
  )
}
