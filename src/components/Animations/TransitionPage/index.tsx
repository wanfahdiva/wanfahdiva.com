import clsx from 'clsx'
import { motion } from 'framer-motion'

import { useIsDesktop } from '@/hooks/useWindowSize'

interface TransitionPageProps {
  endedLoading?: boolean
}

export const TransitionPage = ({ endedLoading }: TransitionPageProps) => {
  const isDesktop = useIsDesktop()
  const variants = {
    hiddenLoad: { x: 0, y: 0 },
    enterLoad: { x: 0, y: 0, width: '0' },
    exitLoad: { x: 0, y: 0 },
  }

  return (
    <div
      className={clsx(
        'relative z-40 h-screen w-full opacity-100 transition-all duration-700 ease-in-out',
        endedLoading && 'opacity-0'
      )}
    >
      <motion.div
        initial='hiddenLoad'
        animate='enterLoad'
        exit='exitLoad'
        variants={variants}
        transition={{
          duration: isDesktop ? 1.5 : 0.5,
        }}
        className='absolute top-0 z-50 h-screen w-full bg-[#f2f2f2] dark:bg-[#1d1d1dc1]'
      ></motion.div>
      <motion.div
        initial='hiddenLoad'
        animate='enterLoad'
        exit='exitLoad'
        variants={variants}
        transition={{
          duration: isDesktop ? 1.7 : 0.7,
          delay: isDesktop ? 0.2 : 0.15,
        }}
        className='absolute top-0 z-40 h-screen w-full bg-[#e8e8e8] dark:bg-[#171717e4]'
      ></motion.div>
    </div>
  )
}
