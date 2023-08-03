import * as React from 'react'

import { ContainerLayout } from '@/components/Layout'
import Seo from '@/components/SEO'

export default function NotFoundPage() {
  return (
    <ContainerLayout>
      <Seo templateTitle='Not Found' />
      <div className='mx-auto flex h-[70vh] max-w-6xl items-center justify-center py-5 md:py-10'>
        <p>404 PAGE</p>
      </div>
    </ContainerLayout>
  )
}
