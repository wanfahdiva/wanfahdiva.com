import { fetcher } from '@services/fetcher'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'
import { GlobalStyles } from 'twin.macro'

import '@styles/colors.css'
import '@styles/globals.css'
import 'tailwindcss/tailwind.css'

const LoadingPage = dynamic(
  () => {
    return import('@/components/Animations/PageLoading')
  },
  { ssr: false }
) as any

const _APP = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher,
      }}
    >
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem={true}>
        <GlobalStyles />
        <LoadingPage />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SWRConfig>
  )
}

export default _APP
