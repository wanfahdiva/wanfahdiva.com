import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/Space-Grotesk/spacegrotesk-variablefont_wght-webfont.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <meta
          name='google-site-verification'
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
      </Head>
      <body className='font-spacegrotesk bg-primary-700 text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
