import { NextLayoutComponentType } from 'next'

import { SectionRender } from '@/components/Animations'
import { WorkCard } from '@/components/Cards/WorkCard'
import { Layout } from '@/components/Layout/Layout'
import Seo from '@/components/Seo'

const WorkPage: NextLayoutComponentType = () => {
  return (
    <SectionRender delay={0.1}>
      <div tw='grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-4 py-10 md:py-16'>
        {[...Array(4)].map(() => (
          <WorkCard key={Math.random()} />
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

export default WorkPage
