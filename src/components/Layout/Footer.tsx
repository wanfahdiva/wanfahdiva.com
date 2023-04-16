import { useRouter } from 'next/router'

import clsxm from '@/lib/clsxm'

import { RollTextLink } from '../Links/RollTextLink'

const Footer = () => {
  const router = useRouter()

  return (
    <footer
      className={clsxm(
        'flex w-full justify-between p-10',
        router.asPath == '/' ? 'absolute bottom-0 z-50' : ''
      )}
    >
      <p className='w-auto text-sm'>&copy;Wanfah Diva.</p>
      <RollTextLink href='/about'>Profile</RollTextLink>
    </footer>
  )
}
export default Footer
