import { NextLayoutComponentType } from 'next'
import { ReactChild } from 'react'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const HomePage: NextLayoutComponentType = () => {
  return (
    <main className='mx-auto flex h-screen max-w-6xl items-center justify-center !overflow-hidden py-5 md:py-10'>
      <SectionRender delay={0.1}>index</SectionRender>
    </main>
  )
}

HomePage.getLayout = function getLayout(page: ReactChild) {
  return (
    <Layout class='md:px-4'>
      <Seo />
      {page}
    </Layout>
  )
}

export default HomePage
