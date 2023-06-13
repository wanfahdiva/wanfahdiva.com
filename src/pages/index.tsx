import { NextLayoutComponentType } from 'next'
import { Fragment } from 'react'

import {
  SectionAbout,
  SectionExperience,
  SectionGetInTouch,
  SectionHero,
  SectionProject,
} from '@/components/Section/HomeSection'
import Seo from '@/components/SEO'

import { getFeaturedWork, WorkMeta } from '@/api/get-work'

interface LandingProps {
  work: WorkMeta[]
}

const HomePage: NextLayoutComponentType<LandingProps> = ({ work }) => {
  return (
    <Fragment>
      <Seo templateTitle='Home' />
      <SectionHero />
      <SectionAbout />
      <SectionExperience />
      <SectionProject data={work} />
      <SectionGetInTouch />
    </Fragment>
  )
}

HomePage.getLayout = function getLayout(page: React.ReactNode) {
  return page
}

export async function getStaticProps() {
  const work = getFeaturedWork().map((work) => work.meta)
  return { props: { work } }
}
export default HomePage
