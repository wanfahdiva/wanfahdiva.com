import { Fragment } from 'react'

import {
  SectionAbout,
  SectionGetInTouch,
  SectionHero,
  SectionProject,
} from '@/components/Section/HomeSection'
import Seo from '@/components/SEO'

import { getFeaturedProject, ProjectMeta } from '@/api/project'

interface LandingProps {
  project: ProjectMeta[]
}

export default function HomePage({ project }: LandingProps) {
  return (
    <Fragment>
      <Seo templateTitle='Home' />
      <SectionHero />
      <SectionAbout />
      <SectionProject data={project} />
      <SectionGetInTouch />
    </Fragment>
  )
}

export async function getStaticProps() {
  const project = getFeaturedProject().map((project) => project.meta)
  return { props: { project } }
}
