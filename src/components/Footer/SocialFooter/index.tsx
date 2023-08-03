import Link from 'next/link'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'

export const Social = [
  {
    link: 'https://github.com/wanfahdiva',
    icon: <FiGithub />,
  },
  {
    link: 'mailto:wanfahdivaa@gmail.com',
    icon: <GoMail />,
  },
  {
    link: 'https://www.linkedin.com/in/wanfahdiva',
    icon: <FaLinkedin />,
  },
  {
    link: 'https://www.instagram.com/wanfahdiva',
    icon: <AiOutlineInstagram />,
  },
]

export const SocialFooter = () => {
  return (
    <div className='flex space-x-3 md:hidden'>
      {Social.map((item, index) => (
        <Link href={item.link} key={index}>
          <a
            target='_blank'
            className='inline-flex items-center rounded-lg bg-gray-100 bg-opacity-20 p-2'
          >
            {item.icon}
          </a>
        </Link>
      ))}
    </div>
  )
}
