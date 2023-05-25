import { ContainerLayout } from '@/components/Layout'
import ButtonLink from '@/components/Links/ButtonLink'

const TEXT_PROCESS = [
  {
    title: 'Understanding Your Vision',
    description: `I begin by deeply understanding your goals and vision for the website.`,
  },
  {
    title: 'Crafting User-Friendly Interfaces',
    description: `I create intuitive and user-friendly interfaces that enhance the user experience.`,
  },
  {
    title: 'Implementing Responsive Design',
    description: `I ensure that the website looks and functions seamlessly across different devices.`,
  },
  {
    title: 'Writing Clean and Efficient Code',
    description: `I utilize HTML, CSS, and JavaScript to write clean and efficient code for optimal performance.`,
  },
  {
    title: 'Testing and Debugging',
    description: `I rigorously test and debug the website to ensure it functions flawlessly.`,
  },
  {
    title: 'Collaborating and Iterating',
    description: `I value your feedback and collaborate closely with you to iterate and refine the frontend until it meets your expectations.`,
  },
]

export const MyProcess: React.FC = () => {
  return (
    <ContainerLayout className='relative mx-7 mt-10 flex h-full flex-col justify-between py-5 md:mx-auto md:mt-0 md:max-w-5xl md:flex-row md:py-10'>
      <div className='flex w-full md:w-2/5'>
        <div className='sticky top-1/3 h-48'>
          <div className='inline-block opacity-75'>
            <div className='text-center text-sm uppercase'>My Process 1-6</div>
          </div>
          <h2 className='mt-2 text-2xl font-semibold md:w-11/12 md:text-4xl md:font-medium'>
            Your Dream Website in just few steps
          </h2>
          <div>
            <ButtonLink
              href='mailto:wanfahdivaa@gmail.com'
              className='mt-5 text-sm'
              variant='light'
              as='a'
            >
              Get In Touch
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className='flex h-full w-full flex-col items-start border-l-2 pl-3 md:w-3/5 md:items-end md:border-0 md:pl-0'>
        {TEXT_PROCESS.map((item, index) => (
          <div
            key={index}
            className='relative mb-4 flex flex-col items-start justify-center first:mt-2 md:mt-5 md:ml-5 md:mb-0 md:h-48 md:w-4/5 md:space-y-2 md:first:-mt-4'
          >
            <div className='absolute top-1.5 -left-[20.5px] h-4 w-4 rounded-full border-4 border-[#111111] bg-white md:hidden' />
            <h1 className='text-lg md:text-xl'>
              {index + 1}. {item.title}
            </h1>
            <p className='text-sm md:text-base'>{item.description}</p>
          </div>
        ))}
      </div>
    </ContainerLayout>
  )
}
