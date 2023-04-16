import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { WorkCard } from '@/components/Cards'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

import { getAllPosts, PostMeta } from '@/pages/api/api'
interface WorkPageProps {
  work: PostMeta[]
}

const WorkPage: NextLayoutComponentType<WorkPageProps> = ({ work }) => {
  const concatData = work.concat(work).concat(work)
  return (
    <SectionRender delay={0.1}>
      <div className='grid grid-cols-4 gap-5'>
        {/* masonry-2-col gap-y-4 py-10 md:py-16 */}
        {concatData?.map((item: PostMeta, index: number) => (
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
