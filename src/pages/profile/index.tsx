import { NextLayoutComponentType } from 'next'

import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/SEO'

const AboutPage: NextLayoutComponentType = () => {
  return (
    <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
      <p>PROFILE PAGE</p>
    </div>
  )
}

AboutPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Seo templateTitle='Profile' description='Anything about me' />
      {page}
    </Layout>
  )
}

export default AboutPage
