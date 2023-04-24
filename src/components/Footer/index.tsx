import { motion } from 'framer-motion'

import { RollTextLink } from '@/components/Links/RollTextLink'

const Footer = () => {
  const variants = {
    hiddenFooter: { opacity: 0, y: 20, delay: 0.95 },
    enterFooter: { opacity: 1, y: 0 },
    exitFooter: { opacity: 0, y: 0 },
  }

  return (
    <motion.footer
      className='fixed bottom-0 z-30 w-full py-8 md:py-11'
      initial='hiddenFooter'
      animate='enterFooter'
      exit='exitFooter'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut' }}
    >
      <div className='flex w-full items-center justify-between px-6 md:px-10'>
        <p className='text-xs uppercase'>&copy;Wanfah Diva</p>
        <RollTextLink href='/profile'>Profile</RollTextLink>
      </div>
    </motion.footer>
  )
}
export default Footer
