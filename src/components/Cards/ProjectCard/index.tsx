import Image from 'next/image'

import ArrowLink from '@/components/Links/ArrowLink'

import { ProjectMeta } from '@/api/project'

type ProjectCardProps = {
  data: ProjectMeta
  index: number
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ data, index }) => {
  const tags = data.tags.map((tag) => `#${tag}`).join(' ')
  return (
    <div className='flex w-full flex-col space-y-3'>
      {index >= 3 && (
        <div className='mx-auto h-px w-full bg-gray-300 bg-opacity-30'></div>
      )}
      <div className='flex items-center justify-between'>
        <h2 className='text-xl'>{data.title}</h2>
        <small>{data.date}</small>
      </div>
      <div className='relative h-48 w-full rounded'>
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
          className='rounded'
          blurDataURL={data.blurUrl}
        />
      </div>
      <div className=''>
        <p className='line-clamp-3 text-justify text-sm'>{data.excerpt}</p>
        <small className='flex space-x-2 pt-2 text-sm'>{tags}</small>
        <div className='flex justify-end pt-5'>
          <ArrowLink href={`/project/${data.slug}`} className='text-sm'>
            Read More
          </ArrowLink>
        </div>
      </div>
    </div>
  )
}
