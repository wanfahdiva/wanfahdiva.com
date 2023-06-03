import clsx from 'clsx'
import { NextLayoutComponentType } from 'next'
import { Fragment } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import InView from 'react-intersection-observer'

import { ScrambelText } from '@/components/Animations'
import { WorkCard } from '@/components/Cards'
import Seo from '@/components/SEO'

import { getAllContent, WorkMeta } from '@/api/work'
interface WorkPageProps {
  work: WorkMeta[]
}

const WorkPage: NextLayoutComponentType<WorkPageProps> = ({ work }) => {
  return (
    <Fragment>
      <Seo templateTitle='Work' />
      <InView>
        {({ inView, ref }) => (
          <div className='mx-7 py-5 md:mx-auto md:max-w-5xl md:py-10' ref={ref}>
            <div className='flex flex-col space-y-5 md:flex-row md:items-end md:justify-between md:space-y-0'>
              <div>
                <div className='mb-7 flex w-full items-center space-x-5'>
                  <ScrambelText text='Work' className='text-5xl font-normal' />
                  <div
                    className={clsx(
                      'h-px bg-gray-300',
                      inView
                        ? 'w-2/6 transition-all duration-300 ease-in'
                        : 'w-0'
                    )}
                  ></div>
                </div>
                <p className='mt-3 md:w-3/5'>
                  Take a look at my latest projects and see how I can help bring
                  your vision to life.
                </p>
              </div>
              <div>
                <button className='flex items-center space-x-2'>
                  <div className='h-7 w-7 rounded-full bg-white p-1.5 text-black'>
                    <BsArrowRightShort className='rotate-90' />
                  </div>
                  <p className='text-sm'>EXPLORE</p>
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-10 py-10 md:my-20 md:grid-cols-3'>
              {work.map((work, index) => (
                <div key={index}>
                  <WorkCard data={work} />
                </div>
              ))}
            </div>
          </div>
        )}
      </InView>
    </Fragment>
  )
}

WorkPage.getLayout = function getLayout(page) {
  return page
}

export async function getStaticProps() {
  const work = getAllContent().map((work) => work.meta)
  return { props: { work } }
}

export default WorkPage
