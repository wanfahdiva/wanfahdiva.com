import { NextLayoutComponentType } from 'next'
import { Fragment, ReactChild } from 'react'

import Seo from '@/components/SEO'

const NotFound: NextLayoutComponentType = () => {
  return (
    <Fragment>
      <Seo templateTitle='404' />
      <div className='mx-auto flex h-[70vh] max-w-6xl items-center justify-center py-5 md:py-10'>
        <p>404 PAGE</p>
      </div>
    </Fragment>
  )
}

NotFound.getLayout = function getLayout(page: ReactChild) {
  return page
}

export default NotFound
