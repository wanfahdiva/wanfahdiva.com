import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import clsxm from '@/lib/clsxm'

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
  const [isDekstop, setIsDekstop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsDekstop(true)
      } else {
        setIsDekstop(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
      }, 1000)
      setTimeout(() => {
        setEndedLoadingRoute(true)
      }, 500)
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
        const body = document.querySelector('body')
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
          {!loadingRoute && isDekstop && <Cursor />}
          <div
            className={clsxm(
              'w-full px-10',
              // router.asPath != '/' ? ' py-24' : '',
              className
            )}
          >
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  )
}
