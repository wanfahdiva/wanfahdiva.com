import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const AboutPage: NextLayoutComponentType = () => {
  return (
    <SectionRender delay={0.1}>
      <main className='py-10 text-center'>
        <h1>Post</h1>
      </main>
    </SectionRender>
  )
}

AboutPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Seo templateTitle='About' description='Anythig about me' />
      {page}
    </Layout>
  )
}

export default AboutPage
