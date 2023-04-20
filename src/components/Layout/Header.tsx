import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { RollTextLink } from '@/components/Links/RollTextLink'
import NextImage from '@/components/NextImage'

const Header = () => {
  const themes = useTheme()

  const variants = {
    hiddenHeader: { opacity: 0, delay: 0.75 },
    enterHeader: { opacity: 1 },
    exitHeader: { opacity: 0 },
  }

  return (
    <motion.header
      className='fixed top-0 z-30 w-full py-11'
      initial='hiddenHeader'
      animate='enterHeader'
      exit='exitHeader'
      variants={variants}
      transition={{ duration: 1, delay: 0.75, type: 'easeInOut' }}
    >
      <nav className='flex w-full items-center justify-between px-10'>
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
        <RollTextLink href='/work'>Work</RollTextLink>
      </nav>
    </motion.header>
  )
}
export default Header
