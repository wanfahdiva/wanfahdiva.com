import { BlogCard } from '@/components/Cards'
import { ContainerLayout } from '@/components/Layout'
import ArrowLink from '@/components/Links/ArrowLink'

export const FeaturedBlog: React.FC = () => {
  return (
    <ContainerLayout className='mx-auto w-full max-w-5xl py-5 md:py-24'>
      <div className='mb-7 flex w-full items-center justify-between'>
        <h1 className='w-24 text-2xl font-semibold uppercase'>Featured Blog</h1>
        <div className='-mb-9 h-full'>
          <ArrowLink href='/work' className='text-sm !no-underline'>
            <a>View All</a>
          </ArrowLink>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-x-8 gap-y-5'>
        {Array.from({ length: 4 }).map((_, index) => (
          <BlogCard key={index} id={index} />
        ))}
      </div>
    </ContainerLayout>
  )
}
