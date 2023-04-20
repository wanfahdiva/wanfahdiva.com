import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import clsxm from '@/lib/clsxm'
import { useIsDesktop } from '@/hooks/useWindowSize'

import { Noise, SplashScreen, TransitionPage } from '@/components/Animations'
import { Cursor } from '@/components/Cursor'

import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
  class?: string
}

export const Layout = ({ children, class: className }: LayoutProps) => {
  const router = useRouter()
  const [loadingRoute, setLoadingRoute] = useState(false)
  const [endedLoadingRoute, setEndedLoadingRoute] = useState(true)
  const [loadingSplash, setLoadingSplash] = useState(true)
  const [endedLoadingSplash, setEndedLoadingSplash] = useState(false)
  const isDesktop = useIsDesktop()
  const variants = {
    hiddenMain: { x: 0, y: 0, opacity: 0 },
    enterMain: { x: 0, y: 0, opacity: 1 },
    exitMain: { x: 0, y: 0, opacity: 1 },
  }

  // handle animation when route change
  useEffect(() => {
    const body = document.querySelector('body')
    const handleRouteChangeStart = (url: string) => {
      if (url === router.asPath) {
        return
      }
      setLoadingRoute(true)
      body?.classList.add('overflow-hidden')
    }
    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setLoadingRoute(false)
        body?.classList.remove('overflow-hidden')
      }, 2000)
      setTimeout(() => {
        setEndedLoadingRoute(true)
      }, 1500)
    }
    const handleRouteChangeError = () => {
      setLoadingRoute(false)
      body?.classList.remove('overflow-hidden')
    }
    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router.events, router.asPath])

  // handle animation when page loaded
  useEffect(() => {
    const body = document.querySelector('body')
    if (loadingSplash) {
      if (router.asPath == '/') {
        body?.classList.add('overflow-hidden')
      } else {
        body?.classList.remove('overflow-hidden')
      }
    }
    setTimeout(() => {
      setLoadingSplash(false)
    }, 4000)
    setTimeout(() => {
      setEndedLoadingSplash(true)
    }, 3000)
  }, [loadingSplash, router.asPath])

  return (
    <>
      <Noise />
      {loadingRoute && <TransitionPage endedLoading={endedLoadingRoute} />}
      {loadingSplash && <SplashScreen endedLoading={endedLoadingSplash} />}
      {!loadingSplash && (
        <>
          <Header />
          {!loadingRoute && isDesktop && <Cursor />}
          <motion.main
            initial='hiddenMain'
            animate='enterMain'
            exit='exitMain'
            variants={variants}
            transition={{ duration: 1, delay: 0.75, type: 'easeInOut' }}
            className={clsxm(
              'h-full w-full',
              // router.asPath != '/' ? ' py-24' : '',
              className
            )}
          >
            {children}
          </motion.main>
          <Footer />
        </>
      )}
    </>
  )
}
