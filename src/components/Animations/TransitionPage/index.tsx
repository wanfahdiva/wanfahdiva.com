import clsx from 'clsx'
import { motion } from 'framer-motion'

import { useIsDesktop } from '@/hooks/useIsDesktop'

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
        'fixed left-0 top-0 z-30 h-screen w-full opacity-100 transition-opacity duration-700 ease-in-out',
        endedLoading && 'opacity-0'
      )}
    >
      <div
        className={clsx(
          'relative z-40 h-screen w-full opacity-100 transition-opacity duration-700 ease-in-out',
          endedLoading && 'opacity-0'
        )}
      >
        <motion.div
          initial='hiddenLoad'
          animate='enterLoad'
          exit='exitLoad'
          variants={variants}
          transition={{
            duration: isDesktop ? 1.5 : 0.8,
          }}
          className='bg-primary-600 absolute top-0 z-50 h-screen w-full opacity-10'
        />
        <motion.div
          initial='hiddenLoad'
          animate='enterLoad'
          exit='exitLoad'
          variants={variants}
          transition={{
            duration: isDesktop ? 1.7 : 1,
            delay: isDesktop ? 0.2 : 0.175,
          }}
          className='bg-primary-600 absolute top-0 z-40 h-screen w-full opacity-5'
        />
      </div>
    </div>
  )
}
