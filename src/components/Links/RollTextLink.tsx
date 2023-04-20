import Link from 'next/link'
import { useEffect } from 'react'
import React from 'react'

import clsxm from '@/lib/clsxm'
import { useIsDesktop } from '@/hooks/useWindowSize'

interface RollTextLinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

export const RollTextLink = React.forwardRef<
  HTMLAnchorElement,
  RollTextLinkProps
>(({ children, href, className }, ref) => {
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const rollButtons = document.querySelectorAll('.rollButton')
    rollButtons.forEach(
      (button) =>
        (button.innerHTML =
          '<div><span>' +
          button?.textContent?.trim().split('').join('</span><span>') +
          '</span></div>')
    )
  }, [])
  return (
    <Link href={href} passHref>
      <a
        className={clsxm(
          'text-xs uppercase',
          isDesktop && 'rollButton',
          className
        )}
        ref={ref}
      >
        {children}
      </a>
    </Link>
  )
})
