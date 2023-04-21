import { NextLayoutComponentType } from 'next'
import { Fragment, ReactChild } from 'react'

import Seo from '@/components/SEO'

const HomePage: NextLayoutComponentType = () => {
  return (
    <Fragment>
      <Seo templateTitle='Home' />
      <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
        <p>INDEX PAGE</p>
      </div>
    </Fragment>
  )
}

HomePage.getLayout = function getLayout(page: ReactChild) {
  return page
}

export default HomePage
