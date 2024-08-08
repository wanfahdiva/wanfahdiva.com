'use client'

import { useLenis } from '@studio-freight/react-lenis'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()
  const pathname = usePathname()

  useEffect(() => {
    // reset lenis on pathname change
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(5px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(5px)' }}
      transition={{ ease: 'easeInOut', duration: 1.5 }}
    >
      {children}
    </motion.div>
  )
}
