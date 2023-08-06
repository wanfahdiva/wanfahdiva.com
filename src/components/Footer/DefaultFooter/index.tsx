import Link from 'next/link'

import { SocialFooter } from '@/components/Footer'

export const Footer = () => {
  return (
    <footer
      className='mx-auto mt-7 w-[85%] max-w-4xl border-t border-white border-opacity-40 py-6 md:mt-0 md:w-full'
      id='footer'
    >
      <div className='mx-auto flex w-full flex-col items-center justify-center space-y-4 md:space-y-0'>
        <SocialFooter />
        <Link href='https://github.com/wanfahdiva/wanfahdiva.com' passHref>
          <a className='flex flex-col items-center space-y-1' target='_blank'>
            <p className='text-sm font-medium'>
              Designed and Built by Wanfah Diva.
            </p>
            <p className='text-xs font-medium uppercase'>
              © {new Date().getFullYear()}
            </p>
          </a>
        </Link>
      </div>
    </footer>
  )
}
