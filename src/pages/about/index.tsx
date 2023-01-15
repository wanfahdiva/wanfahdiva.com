import { NextLayoutComponentType } from 'next'

import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const AboutPage: NextLayoutComponentType = () => {
  return (
    <main tw='py-10 text-center'>
      <h1>About</h1>
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
