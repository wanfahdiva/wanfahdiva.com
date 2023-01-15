import type {
  NextComponentType,
  NextLayoutComponentType,
  NextPageContext,
} from 'next'
import type { AppProps } from 'next/app'

declare module 'next' {
  type NextLayoutComponentType<P = Record<string, unknown>> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

declare module 'next/app' {
  type AppLayoutProps<P = n> = AppProps & {
    Component: NextLayoutComponentType<P>
    pageProps: any
  }
}
