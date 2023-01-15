import { motion } from 'framer-motion'
import { Fragment } from 'react'
export const SectionRender = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 },
  }
  return (
    <Fragment>
      <motion.article
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        transition={{ duration: 0.5, type: 'easeInOut' }}
        tw='relative'
      >
        {children}
      </motion.article>
    </Fragment>
  )
}
