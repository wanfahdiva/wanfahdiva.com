import App from 'next/app'

import '@/styles/globals.css'
import '@/styles/mdx.css'

import { MainLayout } from '@/components/Layout'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    )
  }
}

export default MyApp
