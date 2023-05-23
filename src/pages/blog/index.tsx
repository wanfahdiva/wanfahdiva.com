import { NextLayoutComponentType } from 'next'
import { Fragment, ReactChild } from 'react'

import Seo from '@/components/SEO'

const BlogPage: NextLayoutComponentType = () => {
  return (
    <Fragment>
      <Seo templateTitle='Blog' />
      <div className='flex h-screen items-center justify-center'>
        <h1 className='text-2xl font-semibold uppercase'>Coming soon</h1>
      </div>
    </Fragment>
  )
}

BlogPage.getLayout = function getLayout(page: ReactChild) {
  return page
}

export default BlogPage
