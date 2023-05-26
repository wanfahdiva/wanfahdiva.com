import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { GlobalStyles } from 'twin.macro'

import '@/styles/colors.css'
import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'

import { MainLayout } from '@/components/Layout'

const _APP = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem={false}
      forcedTheme={Component.theme || undefined}
    >
      <GlobalStyles />
      <MainLayout>
        <AnimatePresence exitBeforeEnter initial={true}>
          {getLayout(<Component {...pageProps} />)}
        </AnimatePresence>
      </MainLayout>
    </ThemeProvider>
  )
}

export default _APP
