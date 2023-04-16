import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const AboutPage: NextLayoutComponentType = () => {
  return (
    <SectionRender delay={0.1}>
      <main className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
        about
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
