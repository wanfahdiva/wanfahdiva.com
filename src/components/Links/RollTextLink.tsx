import { useEffect } from 'react'
import React from 'react'

import clsxm from '@/lib/clsxm'
import { useIsDesktop } from '@/hooks/useIsDesktop'

interface RollTextLinkProps {
  children: React.ReactNode
  className?: string
}

export const RollTextLink = React.forwardRef<
  HTMLAnchorElement,
  RollTextLinkProps
>(({ children, className }, ref) => {
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const rollTexts = document.querySelectorAll('.rollText')
    if (!isDesktop) return
    rollTexts.forEach(
      (button) =>
        (button.innerHTML =
          '<div><span>' +
          button?.textContent?.trim().split('').join('</span><span>') +
          '</span></div>')
    )
  }, [isDesktop])
  return (
    <a
      ref={ref}
      className={clsxm(
        'cursor-pointer !text-sm !font-semibold uppercase',
        isDesktop && 'rollText',
        className
      )}
    >
      {children}
    </a>
  )
})
