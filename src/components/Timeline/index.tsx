import { Fragment } from 'react'
import tw, { styled } from 'twin.macro'

import * as Icons from '@/components/Icons'
import UnderlineLink from '@/components/Links/UnderlineLink'
import { SvgIcon } from '@/components/Svg'

import datajson from '@/jsons/timeline.json'

const YearStamp = styled.time`
  ${tw`flex items-center justify-center text-sm text-gray-900 md:-ml-3 dark:text-white`}
  &::after {
    content: '';
    flex-grow: 1;
    margin-left: 8px;
    ${tw`border-b-[1px] border-gray-400 dark:border-gray-700`}
  }
`

export const Timeline = () => {
  return (
    <Fragment>
      {datajson.map((item, i) => (
        <div key={i}>
          <YearStamp>{item.tahun}</YearStamp>
          <ol className='relative mt-5 border-l border-gray-400 dark:border-gray-700'>
            {i == 0 && (
              <li className='mb-10 ml-6' key={i}>
                <span className='absolute -left-[15px] flex h-7 w-7 items-center justify-center rounded-full bg-gray-400  ring-2 ring-[#dddddd] transition-all delay-200 ease-in-out dark:bg-gray-700 dark:ring-[#202023]'>
                  <Icons.Coffee />
                </span>
                <div className='flex flex-col space-y-1'>
                  <time className='block text-sm font-normal text-gray-700 dark:text-gray-400'>
                    Work in progress...
                  </time>
                  <p className='text-xs'>now</p>
                  <p className='mb-4 text-justify text-sm font-normal text-gray-400 dark:text-gray-600'>
                    More timeline entries coming soon
                  </p>
                </div>
              </li>
            )}
            {item.data.map((e: any, i: number) => (
              <li className='mb-10 ml-6 -mt-1' key={i}>
                <span className='absolute -left-[15px] flex h-7 w-7 items-center justify-center rounded-full bg-gray-400  ring-2 ring-[#dddddd] transition-all delay-200 ease-in-out dark:bg-gray-700 dark:ring-[#202023]'>
                  <SvgIcon iconz={e.icon} />
                </span>
                <div className='flex flex-col space-y-1'>
                  <time className='block text-sm font-normal text-gray-700 dark:text-gray-400'>
                    {e.title}
                    {e.link && (
                      <UnderlineLink href={e.link}>{e.linkname}</UnderlineLink>
                    )}
                  </time>
                  <p className='text-xs'>{e.date}</p>
                  {e.desc && (
                    <p className='mb-4 text-justify text-sm font-normal text-gray-400 dark:text-gray-600'>
                      {e.desc}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </Fragment>
  )
}
