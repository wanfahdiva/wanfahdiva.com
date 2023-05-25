import { NextLayoutComponentType } from 'next'
import { Fragment, ReactChild } from 'react'

import Seo from '@/components/SEO'

const BlogPage: NextLayoutComponentType = () => {
  return (
    <Fragment>
      <Seo templateTitle='Blog' />
      <div className='mx-auto flex h-[70vh] max-w-6xl items-center justify-center py-5 md:py-10'>
        <p>COMING SOON</p>
      </div>
    </Fragment>
  )
}

BlogPage.getLayout = function getLayout(page: ReactChild) {
  return page
}

export default BlogPage
