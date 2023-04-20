import { NextLayoutComponentType } from 'next'

import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/SEO'

import { getAllPosts, PostMeta } from '@/api/api'
interface WorkPageProps {
  work: PostMeta[]
}

const WorkPage: NextLayoutComponentType<WorkPageProps> = () => {
  return (
    <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
      <p>WORK PAGE</p>
    </div>
  )
}

WorkPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Seo templateTitle='Work' />
      {page}
    </Layout>
  )
}

export async function getStaticProps() {
  const work = getAllPosts().map((post) => post.meta)
  return { props: { work } }
}

export default WorkPage
