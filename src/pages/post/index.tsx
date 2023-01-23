import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const PostPage: NextLayoutComponentType = () => {
  return (
    <SectionRender delay={0.1}>
      <main tw='py-10'>
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
