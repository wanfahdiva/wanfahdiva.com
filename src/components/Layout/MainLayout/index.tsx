import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

import { useIsDesktop } from '@/hooks/useWindowSize'

import { Noise, SplashScreen, TransitionPage } from '@/components/Animations'
import { Cursor } from '@/components/Cursor'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Seo from '@/components/SEO'

import { useLoadSplash } from '@/store/index'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter()
  const isDesktop = useIsDesktop()
  const [loadingRoute, setLoadingRoute] = useState<boolean>(false)
  const [endedLoadingRoute, setEndedLoadingRoute] = useState<boolean>(true)
  const [loadingSplash, setLoadingSplash] = useState<boolean>(true)
  const [endedLoadingSplash, setEndedLoadingSplash] = useState<boolean>(false)
  const [refreshCursor, setRefreshCursor] = useState<boolean>(false)
  const [isBlur, setIsBlur] = useState<boolean>(true)

  const globalStateSplash = useLoadSplash()

  // handle animation when route change
  useEffect(() => {
    const body = document.querySelector('body')
    const handleRouteChangeStart = (url: string) => {
      if (url === router.asPath) {
        return
      }
      setRefreshCursor(true)
      setLoadingRoute(true)
      body?.classList.add('overflow-hidden')
    }
    const handleRouteChangeComplete = () => {
      setRefreshCursor(false)
      setTimeout(() => {
        setLoadingRoute(false)
        body?.classList.remove('overflow-hidden')
      }, 700)
      setTimeout(() => {
        setEndedLoadingRoute(true)
      }, 1200)
    }
    const handleRouteChangeError = () => {
      setRefreshCursor(true)
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
  }, [
    router.events,
    router.asPath,
    setRefreshCursor,
    setLoadingRoute,
    setEndedLoadingRoute,
  ])

  // handle animation when page loaded
  useEffect(() => {
    const body = document.querySelector('body')
    if (loadingSplash) {
      globalStateSplash.setstatus(true)
      if (router.asPath == '/') {
        body?.classList.add('overflow-hidden')
      } else {
        body?.classList.remove('overflow-hidden')
      }
      setTimeout(() => {
        setLoadingSplash(false)
      }, 4000)
      setTimeout(() => {
        setEndedLoadingSplash(true)
      }, 3000)
    } else {
      globalStateSplash.setstatus(false)
    }
  }, [
    loadingSplash,
    router.asPath,
    globalStateSplash,
    setLoadingSplash,
    setEndedLoadingSplash,
  ])

  useEffect(() => {
    setTimeout(() => {
      if (endedLoadingSplash) {
        setIsBlur(false)
      }
    }, 1500)
  }, [endedLoadingSplash])

  return (
    <Fragment>
      <Seo />
      <Noise />
      {loadingRoute && <TransitionPage endedLoading={endedLoadingRoute} />}
      {loadingSplash && <SplashScreen endedLoading={endedLoadingSplash} />}
      {!loadingSplash && (
        <>
          <Header />
          {isDesktop && <Cursor routerChange={refreshCursor} />}
          <div
            className={clsx(
              'absolute left-0 top-0 -z-10 h-screen w-full bg-hero bg-[length:250px_370px] bg-center bg-no-repeat opacity-30 transition-all duration-200 ease-in-out dark:opacity-20 md:bg-[length:300px_450px]',
              isBlur && 'blur-sm'
            )}
          />

          {children}
          <Footer />
        </>
      )}
    </Fragment>
  )
}
