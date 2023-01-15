/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import tw, { styled } from 'twin.macro'

import ArrowLink from '@/components/Links/ArrowLink'
import UnstyledLink from '@/components/Links/UnstyledLink'

const Content = styled.p`
  ${tw`h-[2.7rem] overflow-hidden overflow-ellipsis text-sm font-medium text-gray-600 dark:text-white`}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
export const WorkCard = () => {
  return (
    <div className='group flex w-full cursor-pointer flex-row rounded-md bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-muted md:flex-col'>
      <div tw='relative h-[7.4rem] w-28 md:h-32 md:w-full rounded-md object-cover'>
        <Image
          src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
          layout='fill'
          alt='Project'
          className='rounded-md'
        />
      </div>

      <div tw='flex-1 flex-col'>
        <div className='flex flex-col p-2'>
          <h2 className='mb-2 text-lg font-bold text-black dark:text-white'>
            Heading
          </h2>
          <Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            earum! Voluptatum unde quas autem accusamus laborum magni quod?
            Dolorum sed iusto eius quia asperiores! Vitae et nostrum officiis
            excepturi. Totam.
          </Content>
        </div>
        <div className='flex justify-end'>
          <ArrowLink
            as={UnstyledLink}
            className='mt-1 inline-flex items-center text-sm'
            href='/'
          >
            learnmore
          </ArrowLink>
        </div>
      </div>
    </div>
  )
}
