import { useEffect, useRef } from 'react'

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
  const sectionRef = useRef<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current

      if (section) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY

        if (scrollY > sectionTop + sectionHeight - windowHeight) {
          const opacity =
            1 - (scrollY - (sectionTop + sectionHeight - windowHeight)) / 350

          section.style.opacity = opacity
        } else {
          section.style.opacity = 1
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={sectionRef}
      className='mx-auto flex h-full w-full max-w-5xl justify-between py-5 md:py-10'
    >
      <div className='flex w-2/5'>
        <div className='sticky top-1/3 h-48'>
          <div className='relative inline-block opacity-75'>
            <div className='text-center text-sm uppercase'>My Process 1-6</div>
          </div>
          <h2 className='mt-2 w-11/12 text-4xl'>
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
      <div className='flex h-full w-3/5 flex-col items-end'>
        {TEXT_PROCESS.map((item, index) => (
          <div
            key={index}
            className='mt-5 ml-5 flex h-52 w-4/5 flex-col items-start justify-center space-y-2 first:-mt-6'
          >
            <h1 className='text-2xl'>
              {index + 1}. {item.title}
            </h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
