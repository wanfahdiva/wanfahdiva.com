import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import clsxm from '@/lib/clsxm'

import { RollTextLink } from '@/components/Links/RollTextLink'

const Header = () => {
  const [scroll, setScroll] = useState(false)
  const themes = useTheme()

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <header
      className={clsxm(
        'fixed z-50 w-full transition-all duration-300 ease-in-out',
        scroll
          ? 'top-0 bg-[#ffffff40] py-3 backdrop-blur dark:bg-[#20202380]'
          : 'py-7'
      )}
    >
      <nav className='flex w-full items-center justify-between px-10'>
        <Link href='/' passHref>
          <a>
            <Image
              src={`/images/${
                themes.theme == 'dark' ? 'white' : 'black'
              }-logo.png`}
              width={40}
              height={40}
              alt='logo'
            />
          </a>
        </Link>
        <RollTextLink href='/work'>Work</RollTextLink>
      </nav>
    </header>
  )
}
export default Header
