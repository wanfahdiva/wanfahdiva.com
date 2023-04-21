import { NextLayoutComponentType } from 'next'
import { Fragment } from 'react'

import Seo from '@/components/SEO'

const AboutPage: NextLayoutComponentType = () => {
  return (
    <Fragment>
      <Seo templateTitle='Profile' description='Anything about me' />
      <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
        <p>PROFILE PAGE</p>
      </div>
    </Fragment>
  )
}

AboutPage.getLayout = function getLayout(page) {
  return page
}

export default AboutPage
