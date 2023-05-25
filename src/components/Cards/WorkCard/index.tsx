import Image from 'next/image'
import Link from 'next/link'

import { WorkMeta } from '@/api/work'

type WorkCardProps = {
  data: WorkMeta
}
export const WorkCard: React.FC<WorkCardProps> = ({ data }) => {
  return (
    <Link href={`/work/${data?.slug}`} passHref>
      <a className='group flex flex-col items-start space-y-2 border-t py-5 md:flex-row md:items-center md:space-y-0 md:space-x-4 md:pb-10'>
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
        <div className='flex-1 flex-col space-y-3'>
          <h2 className='text-lg font-semibold uppercase'>{data?.title}</h2>
          <p className='mb-2 line-clamp-2 md:mb-1.5 md:line-clamp-2'>
            {data?.excerpt}
          </p>
          <small>Tag: {data?.tags.join(', ')}</small>
        </div>
      </a>
    </Link>
  )
}
