import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo, useState } from 'react'

import { useHeaderHeight } from '@/hooks/useHeaderHeight'
import { useIsDesktop } from '@/hooks/useIsDesktop'

import { Noise, SplashScreen, TransitionPage } from '@/components/Animations'
import { Cursor } from '@/components/Cursor'
import { Footer } from '@/components/Footer/DefaultFooter'
import Header from '@/components/Header'
import { SocialMediaSection } from '@/components/Section/GlobalSection'
import Seo from '@/components/SEO'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter()
  const isDesktop = useIsDesktop()
  const headerHeight = useHeaderHeight()
  const [loadingRoute, setLoadingRoute] = useState<boolean>(false)
  const [endedLoadingRoute, setEndedLoadingRoute] = useState<boolean>(true)
  const [loadingSplash, setLoadingSplash] = useState<boolean>(true)
  const [endedLoadingSplash, setEndedLoadingSplash] = useState<boolean>(false)
  const [refreshCursor, setRefreshCursor] = useState<boolean>(false)
  const [isBlur, setIsBlur] = useState<boolean>(true)

  const currentRouter = router.asPath

  useEffect(() => {
    const body = document.querySelector('body')
    const handleRouteChangeStart = (url: string) => {
      if (url === router.asPath) {
        return
      }

      window.scrollTo(0, 0)
      setRefreshCursor(true)
      setLoadingRoute(true)
      body?.classList.add('overflow-hidden')
    }
    const handleRouteChangeComplete = () => {
      setRefreshCursor(false)
      setTimeout(() => {
        setLoadingRoute(false)
        body?.classList.remove('overflow-hidden')
      }, 1000)
      setTimeout(() => {
        setEndedLoadingRoute(true)
      }, 1250)
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
    currentRouter,
  ])

  useEffect(() => {
    const body = document.querySelector('body')
    if (loadingSplash) {
      body?.classList.add('overflow-hidden')
      setTimeout(() => {
        setLoadingSplash(false)
      }, 4000)
      setTimeout(() => {
        setEndedLoadingSplash(true)
      }, 3000)
    } else {
      body?.classList.remove('overflow-hidden')
    }
  }, [loadingSplash, setLoadingSplash, setEndedLoadingSplash])

  useEffect(() => {
    setTimeout(() => {
      if (endedLoadingSplash) {
        setIsBlur(false)
        setRefreshCursor(true)
      }
    }, 1500)
  }, [endedLoadingSplash])

  useEffect(() => {
    setTimeout(() => {
      if (endedLoadingRoute) {
        setIsBlur(false)
      }
    }, 2000)
  }, [endedLoadingRoute])

  const offset = useMemo(() => {
    const path = ['/resume', '/']
    if (path.includes(router.pathname)) {
      return 0
    } else {
      return headerHeight
    }
  }, [headerHeight, router])

  useEffect(() => {
    const header = document.getElementById('header')
    const footer = document.getElementById('footer')
    const social = document.getElementById('social-media')
    const cursor = document.getElementById('cursor')
    const noise = document.getElementById('noise')
    if (router.asPath.includes('/resume')) {
      if (header && footer && social && cursor && noise) {
        header.classList.add('hidden')
        footer.classList.add('hidden')
        social.classList.add('hidden')
        cursor.classList.add('hidden')
        noise.classList.add('hidden')
      }
    } else {
      if (header && footer && social && cursor && noise) {
        header.classList.remove('hidden')
        footer.classList.remove('hidden')
        social.classList.remove('hidden')
        cursor.classList.remove('hidden')
        noise.classList.remove('hidden')
      }
    }
  }, [router.asPath])

  return (
    <Fragment>
      {loadingSplash && <Seo />}
      <Noise />
      {loadingRoute && <TransitionPage endedLoading={endedLoadingRoute} />}
      {loadingSplash && <SplashScreen endedLoading={endedLoadingSplash} />}
      <div
        className={loadingSplash || loadingRoute ? 'opacity-0' : 'opacity-100'}
      >
        {isDesktop && <Cursor routerChange={refreshCursor} />}
        {!loadingSplash && (
          <div>
            <Header
              isSplashScreen={loadingSplash}
              isLoadingRoute={loadingRoute}
            />
            <div
              className={clsx('relative', isBlur ? 'blur-sm' : '')}
              style={{
                paddingTop: offset,
              }}
            >
              {children}
            </div>
            <Footer />
            <SocialMediaSection />
          </div>
        )}
      </div>
    </Fragment>
  )
}
