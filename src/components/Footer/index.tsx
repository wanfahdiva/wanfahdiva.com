import Link from 'next/link'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'

const Footer = () => {
  return (
    <footer className='mx-auto mt-20 w-full max-w-6xl py-6 md:mt-0'>
      <div className='flex w-full flex-col items-center justify-center space-y-4'>
        <div className='flex space-x-3 md:hidden'>
          <Link href='https://github.com/wanfahdiva' passHref>
            <a
              target='_blank'
              className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
            >
              <FiGithub />
            </a>
          </Link>
          <Link href='mailto:wanfahdivaa@gmail.com' passHref>
            <a
              target='_blank'
              className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
            >
              <GoMail />
            </a>
          </Link>
          <Link href='https://www.linkedin.com/in/wanfahdiva' passHref>
            <a
              target='_blank'
              className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
            >
              <FaLinkedin />
            </a>
          </Link>
          <Link href='https://www.instagram.com/wanfahdiva' passHref>
            <a
              target='_blank'
              className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
            >
              <AiOutlineInstagram />
            </a>
          </Link>
        </div>
        <Link href='https://github.com/wanfahdiva/wanfahdiva.com' passHref>
          <a className='flex flex-col items-center space-y-1' target='_blank'>
            <p className='text-sm font-medium'>
              Designed and Built by Wanfah Diva
            </p>
            <p className='text-xs font-medium uppercase'>
              © {new Date().getFullYear()}
            </p>
          </a>
        </Link>
      </div>
    </footer>
  )
}
export default Footer
