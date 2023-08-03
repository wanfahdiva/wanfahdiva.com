import clsx from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Link as ScrollLink, scroller } from 'react-scroll'

import { useHeaderHeight } from '@/hooks/useHeaderHeight'
import { useIsDesktop } from '@/hooks/useIsDesktop'

import { SocialFooter } from '@/components/Footer'
import { RollTextLink } from '@/components/Links/RollTextLink'
import NextImage from '@/components/NextImage'

const Header = ({
  isSplashScreen,
  isLoadingRoute,
}: {
  isSplashScreen: boolean
  isLoadingRoute: boolean
}) => {
  const links = ['About', 'Project', 'Contact']
  const router = useRouter()
  const IsDesktop = useIsDesktop()
  const headerHeight = useHeaderHeight()
  const [isOpen, setIsOpen] = useState(false)
  const [isLanding, setIsLanding] = useState(false)

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
    hiddenHeader: { y: -20, opacity: 0, transition: { duration: 0.5 } },
    enterHeader: { y: 0, opacity: 1 },
    exitHeader: { y: 0, opacity: 0 },
  }

  const scrollToPage = async (target: string) => {
    const isBase = router.asPath === '/'
    if (!isBase) {
      await router.push('/')
    }
    scroller.scrollTo(target, {
      smooth: true,
      duration: 500,
      offset: target.toLowerCase().includes('contact')
        ? 0.5
        : -headerHeight + 30,
    })
  }

  return (
    <motion.header
      className={clsx(
        'fixed top-0 z-30 w-full py-6 md:py-5',
        isOpen ? 'bg-[#191919]' : 'backdrop-blur-sm'
      )}
      initial='hiddenHeader'
      animate='enterHeader'
      exit='exitHeader'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut', delay: 0.5 }}
      id='header'
    >
      <nav className='flex w-full items-center justify-between px-6 md:px-20'>
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
                src='/images/white-logo.png'
                width={45.5}
                height={45.5}
                alt='logo'
              />
            </a>
          </Link>
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
              src='/images/white-logo.png'
              width={45.5}
              height={45.5}
              alt='logo'
            />
          </ScrollLink>
        </div>
        <div className='hidden items-center space-x-5 md:flex'>
          {links.map((link, index) => (
            <div key={index} className='flex space-x-1'>
              <span className='text-xs opacity-75 md:font-semibold'>
                0{index + 1}.
              </span>
              <ScrollLink
                to={link.toLowerCase()}
                smooth={true}
                duration={500}
                offset={
                  link.toLowerCase().includes('contact')
                    ? 0.5
                    : -headerHeight + 30
                }
                onClick={() =>
                  router.asPath !== '/' && scrollToPage(link.toLowerCase())
                }
              >
                <RollTextLink>{link}</RollTextLink>
              </ScrollLink>
            </div>
          ))}
        </div>

        <div className='inline-flex md:hidden'>
          <input
            type='checkbox'
            id='burger-toggle'
            onChange={(e) => setIsOpen(e.target.checked)}
            checked={isOpen}
          />
          <label htmlFor='burger-toggle' className='burger-menu'>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </label>
          {isOpen && (
            <div
              className='menu flex items-start justify-start'
              style={{
                marginTop: headerHeight,
                height: `calc(100vh - ${headerHeight}px)`,
              }}
            >
              <div className='flex w-full flex-col'>
                {links.map((link, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.25,
                      type: 'easeInOut',
                    }}
                    key={index}
                    className='flex space-x-1 py-3 text-lg uppercase'
                  >
                    <span className='pl-7 opacity-75'>0{index + 1}.</span>
                    <ScrollLink
                      to={link.toLowerCase()}
                      onClick={() => {
                        scrollToPage(link.toLowerCase()), setIsOpen(false)
                      }}
                    >
                      <span>{link}</span>
                    </ScrollLink>
                  </motion.div>
                ))}
                <div
                  className={clsx(
                    'fixed bottom-0 flex w-full items-center justify-between p-6',
                    isOpen ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  <SocialFooter />
                  <span className='font-medium'>© Wanfah Diva</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  )
}
export default Header
