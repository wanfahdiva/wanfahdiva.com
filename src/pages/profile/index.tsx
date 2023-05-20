import clsx from 'clsx'
import { motion } from 'framer-motion'
import { NextLayoutComponentType } from 'next'
import Image from 'next/image'
import { Fragment } from 'react'

import Seo from '@/components/SEO'

const AboutPage: NextLayoutComponentType = () => {
  const variant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  const variantImage = {
    hidden: { opacity: 0, blur: 20 },
    visible: { opacity: 1, blur: 0 },
  }
  const variantText = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <Fragment>
      <Seo templateTitle='Profile' description='Anything about me' />
      <div className='relative mx-auto flex h-screen max-w-6xl flex-col items-center justify-center py-5 md:py-10'>
        {Array.from({ length: 4 }, (_, i) => (
          <motion.p
            key={i}
            initial='hidden'
            animate='visible'
            variants={variant}
            transition={{
              duration: 1,
              delay: i * 0.5,
            }}
            className={clsx(
              '!font-poltawski text-7xl italic md:text-[9rem]',
              i != 0 ? 'text-stroke text-transparent opacity-50' : '!opacity-75'
            )}
          >
            PROFILE
          </motion.p>
        ))}
        <motion.div
          className='absolute h-[358px] w-[265px] !rotate-[9deg]'
          initial='hidden'
          animate='visible'
          variants={variantImage}
          transition={{
            duration: 1,
            delay: 2,
          }}
        >
          <Image src='/images/profile.jpg' alt='profile' layout='fill' />
        </motion.div>
        <motion.span
          className='absolute translate-y-24 -rotate-6 transform !font-montglades text-6xl font-medium'
          initial='hidden'
          animate='visible'
          variants={variantText}
          transition={{
            duration: 1,
            delay: 3,
          }}
        >
          Wanfah Diva
        </motion.span>
      </div>
    </Fragment>
  )
}

AboutPage.getLayout = function getLayout(page) {
  return page
}

export default AboutPage
