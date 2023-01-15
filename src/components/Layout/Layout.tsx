import clsx from 'clsx'

import { SectionRender } from '@/components/Animations'
import { Cursor } from '@/components/Cursor'

import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
  class?: string
}

export const Layout = ({ children, class: className }: LayoutProps) => {
  return (
    <>
      <Header />
      <div
        className={clsx(
          'mx-auto flex max-w-xs justify-center md:max-w-md',
          className
        )}
      >
        <Cursor />
        <SectionRender>{children}</SectionRender>
      </div>
      <SectionRender>
        <Footer />
      </SectionRender>
    </>
  )
}
