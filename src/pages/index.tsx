import { NextLayoutComponentType } from 'next'
import { Fragment, ReactChild } from 'react'

import {
  FeaturedBlog,
  FeaturedProject,
  GetInTouch,
  Hero,
  MyProcess,
} from '@/components/Section/HomeSection'
import Seo from '@/components/SEO'

import { getAllContent, WorkMeta } from '@/api/work'

interface LandingProps {
  work: WorkMeta[]
}

const HomePage: NextLayoutComponentType<LandingProps> = ({ work }) => {
  return (
    <Fragment>
      <Seo templateTitle='Home' />
      <Hero />
      <FeaturedProject data={work} />
      <MyProcess />
      <FeaturedBlog />
      <GetInTouch />
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
