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
    <div className="flex flex-col items-center justify-center w-full mx-auto space-y-6">
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
      <p className="w-4/5 text-xs font-medium text-center transition-colors duration-300 ease-in-out sm:w-full">
        Made with ❤️ by Wanfah Diva. Copyright © {new Date().getFullYear()}. All rights reserved.
      </p>
    </div>
  </footer>
)
