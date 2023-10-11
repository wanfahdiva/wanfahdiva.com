import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import '@/styles/mdx.css'

import useSmoothScroll from '@/hooks/use-smooth-scroll'

import { MainLayout } from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  useSmoothScroll()
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
