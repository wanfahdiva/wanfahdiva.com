import { motion } from 'framer-motion'
import { NextLayoutComponentType } from 'next'
import Link from 'next/link'
import { Fragment, ReactChild } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'

import { useTimestamp } from '@/hooks/useTimestamp'

import Seo from '@/components/SEO'

import { ANIMATED_VARIANT } from '@/constants/animated'

const HomePage: NextLayoutComponentType = () => {
  const showAnimation = useTimestamp('initial')

  return (
    <Fragment>
      <Seo templateTitle='Home' />
      <div className='mx-auto flex h-screen max-w-6xl items-center justify-center py-5 md:py-10'>
        <div className='relative flex max-w-3xl flex-col items-center justify-center'>
          <motion.div
            className='text-center'
            initial='hiddenTop'
            animate='visibleTop'
            variants={showAnimation ? ANIMATED_VARIANT : {}}
          >
            <p className='inline'>Hi, my name is</p>
            <h1 className='text-3xl md:text-7xl'>Wanfah Diva.</h1>
            <h3 className='!-mt-2 text-3xl opacity-80 md:text-7xl'>
              I build things for the web
            </h3>
          </motion.div>
          <motion.div
            className='flex flex-col items-center space-y-5 text-center'
            initial='hiddenBottom'
            animate='visibleBottom'
            variants={showAnimation ? ANIMATED_VARIANT : {}}
          >
            <div className='mx-auto !mt-12 w-11/12 text-center'>
              <p className='inline text-sm opacity-80 md:text-base'>
                I am a Software Engineer with expertise in building Frontend
                Developments, based in Indonesia.
                <br />
                Presently, my focus lies in crafting accessible and
                high-performance web applications at &nbsp;
              </p>
              <Link href='https://sawala.tech/' passHref>
                <a target='_blank' className='text-sm md:text-base'>
                  PT. Sawala Technology Indonesia.
                </a>
              </Link>
            </div>
            <div className='!mt-5 inline-flex items-center space-x-2 md:!mt-1 md:space-x-5'>
              <Link href='https://github.com/wanfahdiva' passHref>
                <a
                  target='_blank'
                  className='inline-flex items-center space-x-1 rounded-md bg-black p-2 opacity-80 md:bg-transparent'
                >
                  <FiGithub />
                  <span className='hidden md:block'>wanfahdiva</span>
                </a>
              </Link>
              <Link href='mailto:wanfahdivaa@gmail.com' passHref>
                <a
                  target='_blank'
                  className='inline-flex items-center space-x-1 rounded-md bg-black p-2 opacity-80 md:bg-transparent'
                >
                  <GoMail />
                  <span className='hidden md:block'>wanfahdivaa@gmail.com</span>
                </a>
              </Link>
              <Link href='https://www.linkedin.com/in/wanfahdiva/' passHref>
                <a
                  target='_blank'
                  className='inline-flex items-center space-x-1 rounded-md bg-black p-2 opacity-80 md:bg-transparent'
                >
                  <FaLinkedin />
                  <span className='hidden md:block'>wanfahdiva</span>
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Fragment>
  )
}

HomePage.getLayout = function getLayout(page: ReactChild) {
  return page
}

export default HomePage
