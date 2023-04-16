import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const AboutPage: NextLayoutComponentType = () => {
  return (
    <main className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
      <SectionRender delay={0.1}>ABOUT PAGE</SectionRender>
    </main>
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
