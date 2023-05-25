import { motion } from 'framer-motion'
import Link from 'next/link'

const Footer = () => {
  const variants = {
    hiddenFooter: { opacity: 0, y: 20, delay: 0.95 },
    enterFooter: { opacity: 1, y: 0 },
    exitFooter: { opacity: 0, y: 0 },
  }

  return (
    <motion.footer
      className='mx-auto mt-20 w-full max-w-6xl py-6'
      initial='hiddenFooter'
      animate='enterFooter'
      exit='exitFooter'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut', delay: 4 }}
    >
      <div className='flex w-full items-center justify-center'>
        <Link href='https://github.com/wanfahdiva/wanfahdiva.com' passHref>
          <a className='flex flex-col items-center space-y-1' target='_blank'>
            <p className='text-sm font-medium'>
              Designed and Built by Wanfah Diva
            </p>
            <p className='text-xs font-medium uppercase'>
              © {new Date().getFullYear()}
            </p>
          </a>
        </Link>
      </div>
    </motion.footer>
  )
}
export default Footer
