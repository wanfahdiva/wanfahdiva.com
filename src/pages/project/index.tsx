import clsx from 'clsx'
import { Fragment } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import InView from 'react-intersection-observer'
import { Element, Link } from 'react-scroll'

import { ProjectCard } from '@/components/Cards'
import Seo from '@/components/SEO'

import { getAllProject, ProjectMeta } from '@/api/project'
interface ProjectPageProps {
  project: ProjectMeta[]
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <Fragment>
      <Seo templateTitle='Project' />
      <InView>
        {({ inView, ref }) => (
          <div className='mx-7 py-5 md:mx-auto md:max-w-5xl md:py-10' ref={ref}>
            <div className='flex flex-col space-y-5 md:flex-row md:items-end md:justify-between md:space-y-0'>
              <div>
                <div className='mb-7 flex w-full items-center space-x-5'>
                  <h2 className='text-xl font-semibold uppercase md:text-2xl'>
                    Project
                  </h2>
                  <div
                    className={clsx(
                      'h-px bg-gray-300',
                      inView
                        ? 'w-2/6 transition-all duration-300 ease-in'
                        : 'w-0'
                    )}
                  ></div>
                </div>
                <p className='mt-3 md:w-4/5'>
                  Some things I've built, both professionally and for fun.
                </p>
              </div>
              <div>
                <Link
                  to='project-section'
                  smooth={true}
                  duration={500}
                  offset={-80}
                >
                  <button className='flex items-center space-x-2'>
                    <div className='h-7 w-7 rounded-full bg-white p-1.5 text-black'>
                      <BsArrowRightShort className='rotate-90' />
                    </div>
                    <p className='text-sm'>EXPLORE</p>
                  </button>
                </Link>
              </div>
            </div>

            <Element
              className='grid grid-cols-1 gap-10 py-10 md:mt-10 md:grid-cols-3'
              name='project-section'
            >
              {project.map((project, index) => (
                <ProjectCard data={project} index={index} key={index} />
              ))}
            </Element>
          </div>
        )}
      </InView>
    </Fragment>
  )
}

export async function getStaticProps() {
  const project = getAllProject().map((project) => project.meta)
  return { props: { project } }
}
