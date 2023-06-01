import { NextLayoutComponentType } from 'next'
import { Fragment, ReactChild } from 'react'

import { ScrambelText } from '@/components/Animations'

import { getAllContent, WorkMeta } from '@/api/work'

interface LandingProps {
  work: WorkMeta[]
}

const HomePage: NextLayoutComponentType<LandingProps> = () => {
  return (
    <Fragment>
      <div className='flex h-screen items-center justify-center !font-saoldisplay font-semibold uppercase'>
        <ScrambelText text='Coming Soon' />
      </div>
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
