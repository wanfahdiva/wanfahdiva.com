import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/SEO'

const PostPage: NextLayoutComponentType = () => {
  return (
    <SectionRender delay={0.1}>
      <main className='py-10 text-center'>
        <h1>Post</h1>
      </main>
    </SectionRender>
  )
}

PostPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Seo templateTitle='Post' description='Things that come out of my mind' />
      {page}
    </Layout>
  )
}

export default PostPage
