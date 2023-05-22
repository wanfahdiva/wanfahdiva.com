import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { RollTextLink } from '@/components/Links/RollTextLink'
import NextImage from '@/components/NextImage'

const Header = () => {
  const themes = useTheme()

  const variants = {
    hiddenHeader: { y: -20, opacity: 0, delay: 0.95 },
    enterHeader: { y: 0, opacity: 1 },
    exitHeader: { y: 0, opacity: 0 },
  }

  return (
    <motion.header
      className='fixed top-0 z-30 w-full py-5 backdrop-blur-md'
      initial='hiddenHeader'
      animate='enterHeader'
      exit='exitHeader'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut', delay: 4 }}
      id='header'
    >
      <nav className='flex w-full items-center justify-between px-6 md:px-14'>
        <Link href='/' passHref>
          <a>
            <NextImage
              src={`/images/${
                themes.resolvedTheme == 'dark' ? 'white' : 'black'
              }-logo.png`}
              width={40.5}
              height={40.5}
              alt='logo'
            />
          </a>
        </Link>
        <div className='flex items-center space-x-5'>
          <RollTextLink href='/profile' className='font-semibold'>
            Profile
          </RollTextLink>
          <RollTextLink href='/work' className='font-semibold'>
            Work
          </RollTextLink>
          <RollTextLink href='/blog' className='font-semibold'>
            Blog
          </RollTextLink>
        </div>
      </nav>
    </motion.header>
  )
}
export default Header
