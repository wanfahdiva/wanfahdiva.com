import { fetcher } from '@services/fetcher'
import AOS from 'aos'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { GlobalStyles } from 'twin.macro'

import 'aos/dist/aos.css'
import 'tailwindcss/tailwind.css'
import '@styles/globals.css'
import '@styles/colors.css'

// import Voxel from '@/components/Voxel'

const LoadingPage = dynamic(
  () => {
    return import('@/components/Animations/PageLoading')
  },
  { ssr: false }
)

// const LazyVoxelGlb = dynamic(() => import('@/components/Voxel'), {
//   ssr: false,
//   loading: () => <Voxel />,
// })

const _APP = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout ?? ((page: any) => page)
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: false,
    })
    AOS.refresh()
  }, [])

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
        {/* <LazyVoxelGlb /> */}
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SWRConfig>
  )
}

export default _APP
