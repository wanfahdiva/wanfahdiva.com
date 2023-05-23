import Link from 'next/link'
import { useEffect } from 'react'
import React from 'react'

import clsxm from '@/lib/clsxm'
import { useIsDesktop } from '@/hooks/useWindowSize'

interface RollTextLinkProps {
  children: React.ReactNode
  href: string
  className?: string
  disabled?: boolean
}

export const RollTextLink = React.forwardRef<
  HTMLAnchorElement,
  RollTextLinkProps
>(({ children, href, className, disabled = false }, ref) => {
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const rollButtons = document.querySelectorAll('.rollButton')
    if (!isDesktop) return
    rollButtons.forEach(
      (button) =>
        (button.innerHTML =
          '<div><span>' +
          button?.textContent?.trim().split('').join('</span><span>') +
          '</span></div>')
    )
  }, [isDesktop])
  return (
    <Link href={disabled ? '#' : href} passHref>
      <a className={clsxm('rollButton text-xs uppercase', className)} ref={ref}>
        {children}
      </a>
    </Link>
  )
})
