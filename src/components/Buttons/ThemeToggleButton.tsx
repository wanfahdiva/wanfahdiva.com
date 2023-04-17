import { AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Fragment, useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from '@/components/Icons'

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <Fragment>
      {mounted && (
        <AnimatePresence exitBeforeEnter initial={false}>
          <button
            key={theme === 'dark' ? 'light' : 'dark'}
            aria-label='Toggle Dark Mode'
            type='button'
            className='order-2 h-12 w-12 p-3 md:order-3'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </AnimatePresence>
      )}
    </Fragment>
  )
}
