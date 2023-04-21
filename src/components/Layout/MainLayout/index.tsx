import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

import { useIsDesktop } from '@/hooks/useWindowSize'

import { Noise, SplashScreen, TransitionPage } from '@/components/Animations'
import { Cursor } from '@/components/Cursor'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Seo from '@/components/SEO'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter()
  const [loadingRoute, setLoadingRoute] = useState(false)
  const [endedLoadingRoute, setEndedLoadingRoute] = useState(true)
  const [loadingSplash, setLoadingSplash] = useState(true)
  const [endedLoadingSplash, setEndedLoadingSplash] = useState(false)
  const isDesktop = useIsDesktop()

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
    <Fragment>
      <Seo />
      <Noise />
      {loadingRoute && <TransitionPage endedLoading={endedLoadingRoute} />}
      {loadingSplash && <SplashScreen endedLoading={endedLoadingSplash} />}
      {!loadingSplash && (
        <>
          <Header />
          {isDesktop && <Cursor />}
          <div className='absolute left-0 top-0 -z-10 h-screen w-full bg-hero bg-[length:250px_370px] bg-center bg-no-repeat opacity-30 transition-all ease-in-out dark:opacity-20 md:bg-[length:300px_450px]' />
          {children}
          <Footer />
        </>
      )}
    </Fragment>
  )
}
