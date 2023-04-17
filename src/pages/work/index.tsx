import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/SEO'

import { getAllPosts, PostMeta } from '@/api/api'
interface WorkPageProps {
  work: PostMeta[]
}

const WorkPage: NextLayoutComponentType<WorkPageProps> = () => {
  // const concatData = work.concat(work).concat(work)
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      {/* masonry-2-col gap-y-4 py-10 md:py-16 */}
      {/* {concatData?.map((item: PostMeta, index: number) => (
          <WorkCard key={index} data={item} />
        ))} */}
      <SectionRender delay={0.1}>WORK PAGE</SectionRender>
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
