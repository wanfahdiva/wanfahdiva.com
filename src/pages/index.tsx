import { NextLayoutComponentType } from 'next'
import { ReactChild } from 'react'

import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/SEO'

const HomePage: NextLayoutComponentType = () => {
  return (
    <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
      <p>INDEX PAGE</p>
    </div>
  )
}

HomePage.getLayout = function getLayout(page: ReactChild) {
  return (
    <Layout class='md:px-4'>
      <Seo templateTitle='Home' />
      {page}
    </Layout>
  )
}

export default HomePage
