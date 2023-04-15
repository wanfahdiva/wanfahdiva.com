import clsx from 'clsx'
import { useEffect, useState } from 'react'

import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
  class?: string
}

export const Layout = ({ children, class: className }: LayoutProps) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  return (
    <>
      {loading ? (
        <>Loading... </>
      ) : (
        <>
          <Header />
          <div className={clsx('mx-auto max-w-sm md:max-w-3xl', className)}>
            {children}
          </div>
          <Footer />
        </>
      )}
    </>
  )
}
