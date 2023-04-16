import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Footer from './Footer'
import Header from './Header'
import { SplashScreen } from '../Animations'
import { Noise } from '../Animations/Noise'
import { Cursor } from '../Cursor'

interface LayoutProps {
  children: React.ReactNode
  class?: string
}

export const Layout = ({ children, class: className }: LayoutProps) => {
  const [loading, setLoading] = useState(true)
  const [endedLoading, setEndedLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const body = document.querySelector('body')
    if (router.asPath == '/') {
      body?.classList.add('overflow-hidden')
    } else {
      const body = document.querySelector('body')
      body?.classList.remove('overflow-hidden')
    }

    setTimeout(() => {
      setLoading(false)
    }, 4000)

    setTimeout(() => {
      setEndedLoading(true)
    }, 3000)
  })
  return (
    <>
      <Noise />
      {loading ? (
        <SplashScreen endedLoading={endedLoading} />
      ) : (
        <>
          <Header />
          <Cursor />
          <div
            className={clsx(
              'w-full px-10',
              router.asPath != '/' ? ' py-24' : '',
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
