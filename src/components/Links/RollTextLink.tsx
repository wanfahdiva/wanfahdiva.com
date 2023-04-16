import Link from 'next/link'
import { useEffect } from 'react'
import React from 'react'

import clsxm from '@/lib/clsxm'

interface RollTextLinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

export const RollTextLink = React.forwardRef<
  HTMLAnchorElement,
  RollTextLinkProps
>(({ children, href, className }, ref) => {
  useEffect(() => {
    document
      .querySelectorAll('.rollButton')
      .forEach(
        (button) =>
          (button.innerHTML =
            '<div><span>' +
            button?.textContent?.trim().split('').join('</span><span>') +
            '</span></div>')
      )
  }, [])
  return (
    <Link href={href} passHref>
      <a className={clsxm('rollButton text-xs uppercase', className)} ref={ref}>
        {children}
      </a>
    </Link>
  )
})
