import { motion } from 'framer-motion'
import Link from 'next/link'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'

export const SocialMediaSection: React.FC = () => {
  const variants = {
    hidden: { y: 20, opacity: 0, delay: 0.95 },
    enter: { y: 0, opacity: 1 },
    exit: { y: 0, opacity: 0 },
  }

  return (
    <motion.div
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ duration: 1.25, type: 'easeInOut', delay: 4 }}
      id='social-media'
    >
      <div className='fixed bottom-0 left-14 hidden flex-col items-center justify-center space-y-2 opacity-70 md:flex'>
        <Link href='https://github.com/wanfahdiva' passHref>
          <a target='_blank' className='inline-flex items-center p-2'>
            <FiGithub />
          </a>
        </Link>
        <Link href='mailto:wanfahdivaa@gmail.com' passHref>
          <a target='_blank' className='inline-flex items-center p-2'>
            <GoMail />
          </a>
        </Link>
        <Link href='https://www.linkedin.com/in/wanfahdiva' passHref>
          <a target='_blank' className='inline-flex items-center p-2'>
            <FaLinkedin />
          </a>
        </Link>
        <Link href='https://www.instagram.com/wanfahdiva' passHref>
          <a target='_blank' className='inline-flex items-center p-2'>
            <AiOutlineInstagram />
          </a>
        </Link>
        <div className='h-24 w-px bg-[#111111] opacity-40 dark:bg-white'></div>
      </div>
      <div className='fixed bottom-0 right-14 hidden flex-col items-center justify-center space-y-2 opacity-70 md:flex'>
        <Link href='mailto:wanfahdivaa@gmail.com' passHref>
          <a
            target='_blank'
            className='inline-flex items-center space-x-1 rounded-md p-2'
          >
            <span className='text-vertical text-xs'>wanfahdivaa@gmail.com</span>
          </a>
        </Link>
        <div className='h-24 w-px bg-[#111111] opacity-40 dark:bg-white'></div>
      </div>
    </motion.div>
  )
}
