import { BlogCard } from '@/components/Cards'
import { ContainerLayout } from '@/components/Layout'
import ArrowLink from '@/components/Links/ArrowLink'

export const FeaturedBlog: React.FC = () => {
  return (
    <ContainerLayout className='mx-7 mt-10 py-5 md:mx-auto md:mt-0 md:w-full md:max-w-5xl md:py-10'>
      <div className='mb-7 flex w-full items-center justify-between'>
        <h1 className='text-lg font-semibold uppercase md:text-2xl'>
          Featured <br /> Blog
        </h1>
        <div className='-mb-9 h-full'>
          <ArrowLink href='/blog' className='text-sm !no-underline'>
            <a>View All</a>
          </ArrowLink>
        </div>
      </div>

      <div className='grid grid-rows-4 gap-y-5 md:grid-cols-4 md:grid-rows-1 md:gap-x-8'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <BlogCard id={index} />
          </div>
        ))}
      </div>
    </ContainerLayout>
  )
}
