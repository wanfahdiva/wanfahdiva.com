import { motion } from 'framer-motion'
import Link from 'next/link'

import { Social } from '@/components/Footer/SocialFooter'

export const SocialMediaSection: React.FC = () => {
  const variants = {
    hidden: { y: 20, opacity: 0, transition: { duration: 0.5 } },
    enter: { y: 0, opacity: 1 },
    exit: { y: 0, opacity: 0 },
  }

  return (
    <motion.div
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut', delay: 0.5 }}
      id='social-media'
      className='fixed bottom-0 left-0 right-0 z-50'
    >
      <div className='fixed bottom-0 left-20 hidden flex-col items-center justify-center space-y-2 opacity-70 md:flex'>
        {Social.map((item, index) => (
          <Link href={item.link} passHref key={index}>
            <a target='_blank' className='inline-flex items-center p-2'>
              {item.icon}
            </a>
          </Link>
        ))}
        <div className='h-20 w-px bg-white opacity-40'></div>
      </div>
      <div className='fixed bottom-0 right-20 hidden flex-col items-center justify-center space-y-2 opacity-70 md:flex'>
        <Link href='mailto:wanfahdivaa@gmail.com' passHref>
          <a
            target='_blank'
            className='inline-flex items-center space-x-1 rounded-md p-2'
          >
            <span className='text-vertical text-xs'>wanfahdivaa@gmail.com</span>
          </a>
        </Link>
        <div className='h-20 w-px bg-white opacity-40'></div>
      </div>
    </motion.div>
  )
}
