import { NextLayoutComponentType } from 'next'

import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const PostPage: NextLayoutComponentType = () => {
  return (
    <main tw='py-10'>
      <h1>Post</h1>
    </main>
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
