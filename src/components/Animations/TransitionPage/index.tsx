import clsx from 'clsx'
import { motion } from 'framer-motion'

interface TransitionPageProps {
  endedLoading?: boolean
}

export const TransitionPage = ({ endedLoading }: TransitionPageProps) => {
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
        transition={{ duration: 1.5, delay: 0.25 }}
        className='absolute top-0 z-50 h-screen w-full bg-[#cfcfcf] dark:bg-[#1d1d1dc1]'
      ></motion.div>
      <motion.div
        initial='hiddenLoad'
        animate='enterLoad'
        exit='exitLoad'
        variants={variants}
        transition={{ duration: 1.7, delay: 0.5 }}
        className='absolute top-0 z-40 h-screen w-full bg-[#d8d8d8] dark:bg-[#171717e4]'
      ></motion.div>
    </div>
  )
}
