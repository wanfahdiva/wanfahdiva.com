import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Footer from './Footer'
import Header from './Header'
import { SplashScreen } from '../Animations'
// import { Cursor } from '../Cursor'

interface LayoutProps {
  children: React.ReactNode
  class?: string
}

export const Layout = ({ children, class: className }: LayoutProps) => {
  const [loading, setLoading] = useState(true)
  const [endedLoading, setEndedLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 4000)
    setTimeout(() => {
      setEndedLoading(true)
    }, 3000)
  }, [])
  return (
    <>
      {loading ? (
        <SplashScreen endedLoading={endedLoading} />
      ) : (
        <>
          <Header />
          <div
            className={clsx(
              'w-full px-10',
              router.asPath != '/' ? ' py-24' : '',
              className
            )}
          >
            {/* <Cursor /> */}
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  )
}
