import { ThemeProvider } from 'next-themes'
import { GlobalStyles } from 'twin.macro'

import '@/styles/colors.css'
import '@/styles/globals.css'
import 'tailwindcss/tailwind.css'

const _APP = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return (
    <ThemeProvider
      forcedTheme={Component.theme || undefined}
      attribute='class'
      defaultTheme='system'
    >
      <GlobalStyles />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  )
}

export default _APP
