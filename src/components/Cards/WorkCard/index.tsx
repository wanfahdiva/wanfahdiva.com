/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import tw, { styled } from 'twin.macro'

import ArrowLink from '@/components/Links/ArrowLink'
import UnstyledLink from '@/components/Links/UnstyledLink'

import { WorkMeta } from '@/api/work'

const Content = styled.p`
  ${tw`h-[2.7rem] overflow-hidden overflow-ellipsis text-sm font-medium text-gray-600 dark:text-white`}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
type WorkCardProps = {
  data: WorkMeta
}
export const WorkCard = ({ data }: WorkCardProps) => {
  return (
    <Link href={`/work/${data.slug}`} passHref>
      <a
        href={`/work/${data.slug}`}
        className='group break-inside mb-5 flex w-full cursor-pointer flex-row rounded-md bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-200 hover:shadow-xl dark:bg-muted md:flex-col'
      >
        <div className='flex-1 flex-col'>
          <div className='flex flex-col p-2'>
            <h2 className='mb-2 text-lg font-bold text-black dark:text-white'>
              {data.title}
            </h2>
            <Content>{data.excerpt}</Content>
          </div>
          <div className='flex justify-end'>
            <ArrowLink
              as={UnstyledLink}
              className='mt-1 inline-flex items-center text-sm'
              href={`/work/${data.slug}`}
            >
              learnmore
            </ArrowLink>
          </div>
        </div>
      </a>
    </Link>
  )
}
