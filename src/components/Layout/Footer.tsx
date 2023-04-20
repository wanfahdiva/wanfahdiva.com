import { motion } from 'framer-motion'

import { RollTextLink } from '@/components/Links/RollTextLink'

const Footer = () => {
  const variants = {
    hiddenFooter: { opacity: 0, x: 0, y: 0, delay: 0.75 },
    enterFooter: { opacity: 1, x: 0, y: 0 },
    exitFooter: { opacity: 0, x: 0, y: 0 },
  }

  return (
    <motion.footer
      className='fixed bottom-0 z-30 w-full py-11'
      initial='hiddenFooter'
      animate='enterFooter'
      exit='exitFooter'
      variants={variants}
      transition={{ duration: 1, delay: 0.75, type: 'easeInOut' }}
    >
      <nav className='flex w-full items-center justify-between px-10'>
        <p className='text-xs uppercase'>&copy;Wanfah Diva</p>
        <RollTextLink href='/profile'>Profile</RollTextLink>
      </nav>
    </motion.footer>
  )
}
export default Footer
