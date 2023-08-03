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
          content='I716bANDKemWazZdBga7TmakokO-kYkVgJ_IOhae4aQ'
        />
      </Head>
      <body className='font-spacegrotesk bg-[#191919] text-white duration-300 ease-in'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
