import { motion } from 'framer-motion'

const Footer = () => {
  const variants = {
    hiddenFooter: { opacity: 0, y: 20, delay: 0.95 },
    enterFooter: { opacity: 1, y: 0 },
    exitFooter: { opacity: 0, y: 0 },
  }

  return (
    <motion.footer
      className='mt-24 w-full py-5'
      initial='hiddenFooter'
      animate='enterFooter'
      exit='exitFooter'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut', delay: 4 }}
    >
      <div className='flex w-full flex-col items-center justify-center px-6 md:px-14'>
        <p className='text-xs font-medium uppercase'>
          © {new Date().getFullYear()} Wanfah Diva. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}
export default Footer
