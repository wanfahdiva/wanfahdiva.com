import Link from 'next/link'
import { BsArrowRightShort } from 'react-icons/bs'
type BlogCardProps = {
  data?: any
  id: number
}
export const BlogCard: React.FC<BlogCardProps> = ({ id }) => {
  return (
    <Link href='/blog' passHref>
      <a className='group relative'>
        <div className='flex h-full w-full flex-col bg-dark p-4'>
          <div className='flex items-start justify-between'>
            <span className='!font-saoldisplay text-2xl font-semibold'>
              0{id + 1}
            </span>
            <span className='text-xs uppercase'>10/05/2022</span>
          </div>
          <h1 className='mt-2.5 text-base font-semibold uppercase line-clamp-3 md:mt-5 md:text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            perspiciatis veritatis omnis nesciunt tempore voluptatum blanditiis
            sequi dignissimos asperiores, excepturi fugit sapiente, maxime
            labore! Odio in at animi quia quod!
          </h1>
          <div className='mt-10 flex items-center justify-between md:mt-16'>
            <div className='flex space-x-1'>
              {Array.from({ length: 3 }).map((_, index) => (
                <h2 className='text-xs uppercase' key={index}>
                  #tag{index + 1}
                </h2>
              ))}
            </div>
            <div className='relative h-7 w-7 -rotate-45 overflow-hidden rounded-full bg-white p-1.5 !text-black'>
              <BsArrowRightShort className='absolute -ml-2 translate-x-1/2 transform opacity-100 transition-all duration-300 ease-in-out group-hover:translate-x-[170%] group-hover:opacity-0' />
              <BsArrowRightShort className='absolute -ml-2 -translate-x-[170%] transform opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-1/2 group-hover:opacity-100' />
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
