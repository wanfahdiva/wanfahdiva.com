import Image from 'next/image'

import UnderlineLink from '@/components/Links/UnderlineLink'

import { WorkMeta } from '@/api/work'

type WorkCardProps = {
  data: WorkMeta
}
export const WorkCard: React.FC<WorkCardProps> = ({ data }) => {
  const tags = data.tags.map((tag) => `#${tag}`).join(' ')
  return (
    <div className='group flex flex-col items-start space-y-2 border-t py-5 md:flex-row md:items-center md:space-y-0 md:space-x-4 md:pb-10'>
      <div className='relative h-52 w-full md:h-44 md:w-80'>
        <Image
          src={`/images/work/${
            data?.coverImage ? data.coverImage : 'bg-hero.jpg'
          }`}
          alt={data?.title}
          className='object-cover object-center transition-all duration-300 md:grayscale md:group-hover:grayscale-0'
          layout='fill'
        />
      </div>
      <div className='relative flex-1 flex-col space-y-3 overflow-hidden md:h-44'>
        <div className='mt-2 flex flex-col space-y-2 md:mt-5'>
          <h2 className='text-base font-semibold uppercase'>{data?.title}</h2>
          <p className='line-clamp-2 md:mb-1.5 md:line-clamp-2'>
            {data?.excerpt}
          </p>
        </div>
        <div className='flex flex-col space-y-5'>
          <small>{tags}</small>
          <div className='flex justify-end'>
            <UnderlineLink href='/work'>
              <a className='mr-5 text-right !font-poltawski'>Read More</a>
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}
