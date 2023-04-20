import { NextLayoutComponentType } from 'next'
import { ReactChild } from 'react'

import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/SEO'

const NotFound: NextLayoutComponentType = () => {
  return (
    <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
      <p>404 PAGE</p>
    </div>
  )
}

NotFound.getLayout = function getLayout(page: ReactChild) {
  return (
    <Layout class='md:px-4'>
      <Seo templateTitle='404' />
      {page}
    </Layout>
  )
}

export default NotFound
