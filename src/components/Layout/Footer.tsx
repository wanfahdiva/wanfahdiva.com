import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import clsxm from '@/lib/clsxm'

import { RollTextLink } from '@/components/Links/RollTextLink'

const Footer = () => {
  const router = useRouter()

  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  }

  return (
    <motion.footer
      className={clsxm(
        'flex w-full justify-between px-10 py-12',
        router.asPath == '/' ? 'absolute bottom-0 z-50' : ''
      )}
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ duration: 0.5, type: 'easeInOut' }}
    >
      <p className='text-xs uppercase'>&copy;Wanfah Diva</p>
      <RollTextLink href='/about'>Profile</RollTextLink>
    </motion.footer>
  )
}
export default Footer
