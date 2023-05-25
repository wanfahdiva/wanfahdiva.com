import { motion } from 'framer-motion'
import Link from 'next/link'
import { HiDocumentText } from 'react-icons/hi'

import { useVisitedPage } from '@/hooks/useVisitedPage'

import { ScrambelText } from '@/components/Animations'
import { ContainerLayout } from '@/components/Layout'
import ButtonLink from '@/components/Links/ButtonLink'

export const Hero: React.FC = () => {
  const pageVisited = useVisitedPage()

  return (
    <ContainerLayout className='relative mx-7 flex h-[95vh] items-center justify-start md:mx-auto md:h-screen md:max-w-5xl md:py-10'>
      <div className='mt-3 flex flex-col items-center justify-start space-y-5 md:max-w-4xl'>
        <motion.div className='flex w-full flex-col items-start justify-start'>
          <p className='inline font-medium'>Hi, my name is</p>
          {!pageVisited ? (
            <ScrambelText text='Wanfah Diva.' animationDelay={200} />
          ) : (
            <h1 className='text-4xl font-semibold md:text-6xl'>Wanfah Diva.</h1>
          )}
          <h3 className='text-3xl font-semibold opacity-80 md:text-6xl'>
            I build things for the web.
          </h3>
        </motion.div>
        <motion.div className='flex flex-col items-start justify-start space-y-7'>
          <div className='w-full md:w-11/12'>
            <p className='inline text-sm font-medium opacity-80 md:text-base'>
              I am a Software Engineer with expertise in building Frontend
              Developments.
              <br className='hidden md:block' />
              Presently, my focus lies in crafting accessible and
              high-performance web applications at &nbsp;
            </p>
            <Link href='https://sawala.tech/' passHref>
              <a target='_blank' className='text-sm md:text-base'>
                PT. Sawala Technology Indonesia.
              </a>
            </Link>
          </div>
          <div className='inline-flex items-center space-x-2 md:space-x-5'>
            <ButtonLink
              as='a'
              href='/resume.pdf'
              variant='light'
              className='inline-flex items-center justify-center space-x-2'
            >
              <HiDocumentText />
              <span className='text-sm font-semibold'>Resume</span>
            </ButtonLink>
          </div>
        </motion.div>
      </div>
      <div className='c-scrolldown absolute bottom-3 left-1/2 !opacity-40'>
        <div className='c-line'></div>
      </div>
    </ContainerLayout>
  )
}
