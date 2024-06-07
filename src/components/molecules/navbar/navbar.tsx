'use client'

import { useHeaderHeight } from '@/hooks/use-header-height'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Link as ScrollLink, scroller } from 'react-scroll'

import { RollTextLink } from '@/components/atoms/roll-text-link'

import { cn } from '@/lib/utils'

import { Social } from '../footer'

export const Navbar = () => {
  const links = ['About', 'Project', 'Contact']
  const router = usePathname()
  const headerHeight = useHeaderHeight()
  const [isOpen, setIsOpen] = useState(false)
  const [isLanding, setIsLanding] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (router == '/') {
      setIsLanding(true)
    } else {
      setIsLanding(false)
    }
  }, [router])

  const variants = {
    hiddenHeader: { y: -20, opacity: 0, transition: { duration: 0.5 } },
    enterHeader: { y: 0, opacity: 1 },
    exitHeader: { y: 0, opacity: 0 }
  }

  const scrollToPage = (target: string) => {
    const isBase = router === '/'
    if (!isBase) {
      redirect('/')
    }
    scroller.scrollTo(target, {
      smooth: true,
      duration: 500,
      offset: target.toLowerCase().includes('contact') ? 0.5 : -headerHeight + 30
    })
  }

  setTimeout(() => {
    setShow(true)
  }, 6000)

  if (!show) return null

  return (
    <div className="navbar !hidden">
      <motion.header
        className={cn(' fixed top-0 z-30 w-full', isOpen ? 'bg-mirage' : 'backdrop-blur')}
        initial="hiddenHeader"
        animate="enterHeader"
        exit="exitHeader"
        variants={variants}
        style={{ marginBottom: -headerHeight }}
        transition={{ duration: 1.25, type: 'easeInOut', delay: 0.5 }}
      >
        <nav className="flex items-center justify-between w-full px-6 md:px-20 h-[80px]">
          <div className="relative">
            {isLanding ? (
              <ScrollLink to="hero" smooth={true} duration={500}>
                <h2 className="text-3xl font-semibold text-white">WD</h2>
              </ScrollLink>
            ) : (
              <Link href="/" passHref>
                <h2 className="text-3xl font-semibold text-white">WD</h2>
              </Link>
            )}
          </div>
          <div className="items-center hidden space-x-5 md:flex">
            {links.map((link, index) => (
              <div key={index} className="flex space-x-1">
                <span className="text-xs md:font-semibold">0{index + 1}.</span>
                <ScrollLink
                  to={link.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={['contact'].includes(link.toLowerCase()) ? 0.5 : -headerHeight + 35}
                  onClick={() => router !== '/' && scrollToPage(link.toLowerCase())}
                >
                  <RollTextLink>{link}</RollTextLink>
                </ScrollLink>
              </div>
            ))}
          </div>

          <div className="inline-flex md:hidden">
            <input type="checkbox" id="burger-toggle" onChange={(e) => setIsOpen(e.target.checked)} checked={isOpen} />
            <label htmlFor="burger-toggle" className="burger-menu">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </label>
            {isOpen && (
              <div
                className="flex items-start justify-start menu"
                style={{
                  marginTop: headerHeight,
                  height: `calc(100vh - ${headerHeight}px)`
                }}
              >
                <div className="flex flex-col w-full">
                  {links.map((link, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.25,
                        type: 'easeInOut'
                      }}
                      key={index}
                      className="flex py-3 space-x-1 text-lg uppercase"
                    >
                      <span className="opacity-75 pl-7">0{index + 1}.</span>
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
                    className={cn(
                      'fixed bottom-0 flex w-full items-center justify-between p-6',
                      isOpen ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    <div className="flex space-x-3 md:hidden">
                      {Social.map((item, index) => (
                        <a href={item.link} key={index} target="_blank">
                          <div className="inline-flex items-center p-2 bg-gray-100 rounded-lg bg-opacity-20">
                            {item.icon}
                          </div>
                        </a>
                      ))}
                    </div>
                    <span className="font-medium">© Wanfah Diva</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </motion.header>
    </div>
  )
}
