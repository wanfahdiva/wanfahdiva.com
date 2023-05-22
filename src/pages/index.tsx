import { NextLayoutComponentType } from 'next'
import { Fragment, ReactChild } from 'react'

import {
  FeaturedProject,
  HeroSection,
  ProcessSection,
} from '@/components/Section/Home'
import Seo from '@/components/SEO'

import { getAllContent, WorkMeta } from '@/api/work'

interface LandingProps {
  work: WorkMeta[]
}

const HomePage: NextLayoutComponentType<LandingProps> = ({ work }) => {
  return (
    <Fragment>
      <Seo templateTitle='Home' />
      <HeroSection />
      <FeaturedProject data={work} />
      <ProcessSection />
      {Array.from({ length: 1 }).map((_, index) => (
        <div
          className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'
          key={index}
        >
          dummy section
        </div>
      ))}
    </Fragment>
  )
}

HomePage.getLayout = function getLayout(page: ReactChild) {
  return page
}

export async function getStaticProps() {
  const work = getAllContent().map((work) => work.meta)
  return { props: { work } }
}
export default HomePage
