import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

import { useIsDesktop } from '@/hooks/useIsDesktop'

interface TransitionPageProps {
  endedLoading?: boolean
  variant?: 'vertical' | 'horizontal'
}

export const TransitionPage = ({
  endedLoading,
  variant = 'horizontal',
}: TransitionPageProps) => {
  const isDesktop = useIsDesktop()
  const animate = useMemo(() => {
    let variants = {}
    if (variant == 'horizontal') {
      variants = {
        hiddenLoad: { x: 0, y: 0 },
        enterLoad: { x: 0, y: 0, width: '0' },
        exitLoad: { x: 0, y: 0 },
      }
    } else {
      variants = {
        hiddenLoad: { x: 0, y: 0 },
        enterLoad: { x: 0, y: 0, width: '0' },
        exitLoad: { x: 0, y: 0 },
      }
    }
    return variants
  }, [variant])

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
          variants={animate}
          transition={{
            duration: isDesktop ? 1.7 : 0.8,
          }}
          className='bg-primary-600 absolute top-0 z-50 h-screen w-full opacity-20'
        />
        <motion.div
          initial='hiddenLoad'
          animate='enterLoad'
          exit='exitLoad'
          variants={animate}
          transition={{
            duration: isDesktop ? 1.9 : 1,
            delay: isDesktop ? 0.2 : 0.175,
          }}
          className='bg-primary-600 absolute top-0 z-40 h-screen w-full opacity-10'
        />
      </div>
    </div>
  )
}
