import { NextLayoutComponentType } from 'next'
import { ReactChild } from 'react'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

const HomePage: NextLayoutComponentType = () => {
  return (
    <SectionRender delay={0.1}>
      <main className='py-5 md:py-10'></main>
    </SectionRender>
  )
}

HomePage.getLayout = function getLayout(page: ReactChild) {
  return (
    <Layout class='md:px-4'>
      <Seo />
      {page}
    </Layout>
  )
}

export default HomePage
