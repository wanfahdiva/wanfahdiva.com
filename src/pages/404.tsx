import * as React from 'react'
import { RiQuestionMark } from 'react-icons/ri'

import { Layout } from '@/components/Layout/Layout'
import ArrowLink from '@/components/Links/ArrowLink'
import Seo from '@/components/Seo'

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <div className='flex h-72 flex-col items-center justify-center text-center text-black dark:text-white'>
          <RiQuestionMark
            size={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-2xl md:text-3xl'>Page Not Found</h1>
          <ArrowLink className='mt-4 md:text-lg' href='/'>
            Back to Home
          </ArrowLink>
        </div>
      </main>
    </Layout>
  )
}
