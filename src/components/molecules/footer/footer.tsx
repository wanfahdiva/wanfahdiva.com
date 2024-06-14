'use client'

import * as Icon from 'lucide-react'

interface SocialItem {
  link: string
  icon: keyof typeof Icon
}

export const Social: SocialItem[] = [
  {
    link: 'https://github.com/wanfahdiva',
    icon: 'Github'
  },
  {
    link: 'mailto:wanfahdivaa@gmail.com',
    icon: 'Mail'
  },
  {
    link: 'https://www.linkedin.com/in/wanfahdiva',
    icon: 'Linkedin'
  },
  {
    link: 'https://www.instagram.com/wanfahdiva',
    icon: 'Instagram'
  }
]

export const Footer = () => (
  <footer className="mx-auto mt-7 w-[85%] max-w-4xl border-t-2 border-cement border-opacity-40 py-6 md:mt-0 md:w-full footer">
    <div className="flex flex-col items-center justify-center w-full mx-auto space-y-3">
      <div className="flex space-x-3">
        {Social.map((item, index) => {
          const IconComponent = Icon[item.icon] as React.ElementType

          return (
            <a href={item.link} key={index} target="_blank" className="flex items-center ">
              <IconComponent className="w-5 h-5" />
            </a>
          )
        })}
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        {/* <p className="text-xs font-medium transition-colors duration-300 ease-in-out text-carbon-gray hover:text-white">
            Built with Next.js and Tailwind CSS, hosted on Vercel
          </p> */}
        <p className="text-xs font-medium transition-colors duration-300 ease-in-out">
          Copyright © Wanfah Diva {new Date().getFullYear()} All rights Reserved
        </p>
      </div>
    </div>
  </footer>
)
