import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import { RollTextLink } from '@/components/Links/RollTextLink'

const Header = () => {
  const themes = useTheme()

  const variants = {
    hiddenHeader: { opacity: 0, x: 0, y: -20 },
    enterHeader: { opacity: 1, x: 0, y: 0 },
    exitHeader: { opacity: 0, x: 0, y: 0 },
  }

  return (
    <motion.header
      className='fixed z-30 w-full py-11'
      initial='hiddenHeader'
      animate='enterHeader'
      exit='exitHeader'
      variants={variants}
      transition={{ duration: 0.5, type: 'easeInOut' }}
    >
      <nav className='flex w-full items-center justify-between px-10'>
        <Link href='/' passHref>
          <a>
            <Image
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
