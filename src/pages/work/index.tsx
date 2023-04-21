import { NextLayoutComponentType } from 'next'
import { Fragment } from 'react'

import Seo from '@/components/SEO'

import { getAllContent, WorkMeta } from '@/api/work'
interface WorkPageProps {
  work: WorkMeta[]
}

const WorkPage: NextLayoutComponentType<WorkPageProps> = () => {
  return (
    <Fragment>
      <Seo templateTitle='Work' />
      <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
        <p>WORK PAGE</p>
      </div>
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
