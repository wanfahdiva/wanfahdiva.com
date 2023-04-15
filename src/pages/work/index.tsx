import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { WorkCard } from '@/components/Cards'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

import { getAllPosts, PostMeta } from '@/pages/api/api'

const WorkPage: NextLayoutComponentType = ({ work }) => {
  return (
    <SectionRender delay={0.1}>
      <div className='masonry-2-col gap-y-4 py-10 md:py-16'>
        {(work as PostMeta[])?.map((item: PostMeta, index: number) => (
          <WorkCard key={index} data={item} />
        ))}
      </div>
    </SectionRender>
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
