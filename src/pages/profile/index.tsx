import clsx from 'clsx'
import { motion } from 'framer-motion'
import { NextLayoutComponentType } from 'next'
import Image from 'next/image'
import { Fragment } from 'react'

import Seo from '@/components/SEO'

const STACK = [
  {
    title: 'JavaScript (ES6+)',
    url: 'https://262.ecma-international.org/6.0/',
  },
  {
    title: 'React',
    url: 'https://reactjs.org/',
  },
  {
    title: 'Next.js',
    url: 'https://nextjs.org/',
  },
  {
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
  },
  {
    title: 'Node.js',
    url: 'https://nodejs.org/',
  },
  {
    title: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
  },
]

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
      <div className='mx-7 flex flex-col-reverse md:mx-auto md:mb-20 md:max-w-5xl md:flex-row'>
        <div className='w-full md:pt-10'>
          <h2 className='!font-saoldisplay text-4xl'>- About Me</h2>
          <div className='relative float-right ml-7 mt-7 hidden items-center justify-center md:flex'>
            <motion.div
              className='relative h-[258px] w-[175px] md:h-[358px] md:w-[265px]'
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
              className='absolute translate-y-24 -rotate-6 transform !font-montglades text-2xl font-medium md:translate-y-32 md:text-2xl'
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
          <motion.p
            className='mt-5 text-justify indent-7 text-lg opacity-75'
            initial='hidden'
            animate='visible'
            variants={variantText}
            transition={{
              duration: 1,
              delay: 1.5,
            }}
          >
            Hello! I&apos;m Wanfah Diva. I started studying web development in
            2019, it was the middle of the first grade of high school. I
            didn&apos;t have much to do so I decided to learn web development
            from a Petani Kode course, then started watching lots of Youtube
            videos to explore more about web development especially frontend
            development. There&apos;s a lot of stuff and technology to learn in
            frontend development and I&apos;m motivated to learn as much as I
            can. I enjoy learning something new and getting feedback to make
            myself better and better. On this website I will write several blogs
            and showcase my projects. Fast-forward to today, and I&apos;ve had
            the privilege of working at a start-up. My main focus these days is
            building accessible and high-performance web application at &nbsp;
            <a
              href='https://sawala.tech'
              target='_blank'
              rel='noreferrer'
              className='font-semibold'
            >
              Sawala Technology
            </a>
            &nbsp;for a variety of clients.
          </motion.p>
          <div className='mt-5'>
            <motion.p
              className='text-lg'
              initial='hidden'
              animate='visible'
              variants={variantText}
              transition={{
                duration: 1,
                delay: 2,
              }}
            >
              Here are a few technologies I’ve been working with recently:
            </motion.p>
            <div className='grid grid-cols-2 grid-rows-3'>
              {STACK.map((item, index) => (
                <motion.div
                  key={index}
                  initial='hidden'
                  animate='visible'
                  variants={variantText}
                  transition={{
                    duration: 1,
                    delay: 1.5 + index * 0.5,
                  }}
                >
                  -&nbsp;
                  <a href={item.url} rel='noreferrer' target='_blank'>
                    {item.title}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full md:hidden md:pt-10'>
          <div className='relative mx-auto my-20 flex max-w-6xl flex-col items-center justify-center md:-mt-10 md:h-screen'>
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
                  '-ml-5 !font-poltawski text-7xl italic md:text-[7rem]',
                  i != 0
                    ? 'text-stroke text-transparent opacity-40'
                    : '!opacity-50'
                )}
              >
                PROFILE
              </motion.p>
            ))}
            <motion.div
              className='absolute h-[258px] w-[175px] !rotate-[9deg] md:h-[358px] md:w-[265px]'
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
              className='absolute translate-y-24 -rotate-6 transform !font-montglades text-2xl font-medium md:text-5xl'
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
        </div>
      </div>
    </Fragment>
  )
}

AboutPage.getLayout = function getLayout(page) {
  return page
}

export default AboutPage
