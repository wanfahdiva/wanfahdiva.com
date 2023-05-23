import Link from 'next/link'
import { Fragment } from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'
export const SocialMediaSection: React.FC = () => {
  return (
    <Fragment>
      <div className='fixed bottom-0 left-14 flex flex-col items-center justify-center space-y-2 opacity-70'>
        <Link href='https://github.com/wanfahdiva' passHref>
          <a target='_blank' className='inline-flex items-center p-2 '>
            <FiGithub />
          </a>
        </Link>
        <Link href='mailto:wanfahdivaa@gmail.com' passHref>
          <a target='_blank' className='inline-flex items-center p-2 '>
            <GoMail />
          </a>
        </Link>
        <Link href='https://www.linkedin.com/in/wanfahdiva' passHref>
          <a target='_blank' className='inline-flex items-center p-2 '>
            <FaLinkedin />
          </a>
        </Link>
        <Link href='https://www.instagram.com/wanfahdiva' passHref>
          <a target='_blank' className='inline-flex items-center p-2 '>
            <AiOutlineInstagram />
          </a>
        </Link>
        <div className='h-24 w-px bg-white opacity-40'></div>
      </div>
      <div className='fixed bottom-0 right-14 flex flex-col items-center justify-center space-y-2 opacity-70'>
        <Link href='mailto:wanfahdivaa@gmail.com' passHref>
          <a
            target='_blank'
            className='inline-flex items-center space-x-1 rounded-md p-2 opacity-70 shadow-md'
          >
            <span className='text-vertical text-xs'>wanfahdivaa@gmail.com</span>
          </a>
        </Link>
        <div className='h-24 w-px bg-white opacity-40'></div>
      </div>
    </Fragment>
  )
}
