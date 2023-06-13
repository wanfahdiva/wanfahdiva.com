/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Link as ScrollLink, scroller } from 'react-scroll'

import { useHeaderHeight } from '@/hooks/useHeaderHeight'

import { RollTextLink } from '@/components/Links/RollTextLink'
import NextImage from '@/components/NextImage'

const links = ['About', 'Experience', 'Work', 'Contact']
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'

import { useIsDesktop } from '@/hooks/useWindowSize'

const Header = ({
  isSplashScreen,
  isLoadingRoute,
}: {
  isSplashScreen: boolean
  isLoadingRoute: boolean
}) => {
  const themes = useTheme()
  const router = useRouter()
  const IsDesktop = useIsDesktop()
  const headerHeight = useHeaderHeight()
  const [isOpen, setIsOpen] = useState(false)
  const [isLanding, setIsLanding] = useState(false)
  const wihtoutOffsetLink = ['experience', 'contact']

  useEffect(() => {
    if (router.pathname == '/') {
      setIsLanding(true)
    } else {
      setIsLanding(false)
    }
  }, [router])

  useEffect(() => {
    if (!isSplashScreen || !IsDesktop) {
      if (isLoadingRoute) {
        document.body.style.overflow = 'hidden'
      } else {
        if (isOpen) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'auto'
        }
      }
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [IsDesktop, isLoadingRoute, isOpen, isSplashScreen])

  const variants = {
    hiddenHeader: { y: -20, opacity: 0, delay: 0.95 },
    enterHeader: { y: 0, opacity: 1 },
    exitHeader: { y: 0, opacity: 0 },
  }

  const scrollToPage = async (target: any) => {
    const isBase = router.asPath === '/'
    if (!isBase) {
      await router.push('/')
    }
    scroller.scrollTo(target, {
      smooth: true,
      duration: 500,
      offset: wihtoutOffsetLink.includes(target.toLowerCase())
        ? 0.5
        : -headerHeight + 30,
    })
  }

  return (
    <motion.header
      className={clsx(
        'fixed top-0 z-30 w-full py-5',
        isOpen
          ? 'border-b border-white bg-black md:border-b-0'
          : 'backdrop-blur-md'
      )}
      initial='hiddenHeader'
      animate='enterHeader'
      exit='exitHeader'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut', delay: 4 }}
      id='header'
    >
      <nav className='flex w-full items-center justify-between px-6 md:px-14'>
        <div className='relative'>
          <Link
            href='/'
            passHref
            className={clsx(
              'absolute top-0',
              isLanding ? '-z-50 opacity-0' : 'z-50 opacity-100'
            )}
          >
            <a>
              <NextImage
                src={`/images/${
                  themes.resolvedTheme == 'dark' ? 'white' : 'black'
                }-logo.png`}
                width={40.5}
                height={40.5}
                alt='logo'
              />
            </a>
          </Link>
          {/* @ts-ignore */}
          <ScrollLink
            to='hero'
            smooth={true}
            duration={500}
            className={clsx(
              'absolute top-0 cursor-pointer',
              isLanding ? 'z-50 opacity-100' : '-z-50 opacity-0'
            )}
          >
            <NextImage
              src={`/images/${
                themes.resolvedTheme == 'dark' ? 'white' : 'black'
              }-logo.png`}
              width={40.5}
              height={40.5}
              alt='logo'
            />
          </ScrollLink>
        </div>
        <div className='hidden items-center space-x-5 md:flex'>
          {links.map((link, index) => (
            <div key={index} className='flex cursor-pointer space-x-1'>
              <span className='text-xs opacity-75 md:font-semibold'>
                0{index + 1}.
              </span>
              {/* @ts-ignore */}
              <ScrollLink
                to={link.toLowerCase()}
                onClick={() => {
                  scrollToPage(link.toLowerCase())
                }}
              >
                <RollTextLink className='font-semibold'>{link}</RollTextLink>
              </ScrollLink>
            </div>
          ))}
        </div>

        <div className='inline-flex md:hidden'>
          <input
            type='checkbox'
            id='burger-toggle'
            onChange={(e: any) => setIsOpen(e.target.checked)}
            checked={isOpen}
          />
          <label htmlFor='burger-toggle' className='burger-menu'>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </label>
          <div
            className='menu flex items-start justify-start'
            style={{
              marginTop: headerHeight + 1,
              height: `calc(100vh - ${headerHeight}px)`,
            }}
          >
            <div className='flex w-full flex-col'>
              {links.map((link, index) => (
                <div
                  key={index}
                  className='flex space-x-1 border-b border-white py-6 text-lg uppercase'
                >
                  <span className='pl-7 opacity-75'>0{index + 1}.</span>
                  {/* @ts-ignore */}
                  <ScrollLink
                    to={link.toLowerCase()}
                    onClick={() => {
                      scrollToPage(link.toLowerCase()), setIsOpen(false)
                    }}
                  >
                    <span>{link}</span>
                  </ScrollLink>
                </div>
              ))}
              <div
                className={clsx(
                  'fixed bottom-0 flex w-full items-center justify-between p-6',
                  isOpen ? 'opacity-100' : 'opacity-0'
                )}
              >
                <div className='flex space-x-3 md:hidden'>
                  <Link href='https://github.com/wanfahdiva' passHref>
                    <a
                      target='_blank'
                      className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
                    >
                      <FiGithub />
                    </a>
                  </Link>
                  <Link href='mailto:wanfahdivaa@gmail.com' passHref>
                    <a
                      target='_blank'
                      className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
                    >
                      <GoMail />
                    </a>
                  </Link>
                  <Link href='https://www.linkedin.com/in/wanfahdiva' passHref>
                    <a
                      target='_blank'
                      className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
                    >
                      <FaLinkedin />
                    </a>
                  </Link>
                  <Link href='https://www.instagram.com/wanfahdiva' passHref>
                    <a
                      target='_blank'
                      className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
                    >
                      <AiOutlineInstagram />
                    </a>
                  </Link>
                </div>
                <span className='font-medium'>© Wanfah Diva</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
export default Header
