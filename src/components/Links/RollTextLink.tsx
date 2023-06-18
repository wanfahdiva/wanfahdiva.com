import { useEffect } from 'react'
import React from 'react'

import clsxm from '@/lib/clsxm'
import { useIsDesktop } from '@/hooks/useWindowSize'

interface RollTextLinkProps {
  children: React.ReactNode
  className?: string
  as?: string
}

export const RollTextLink = React.forwardRef<
  HTMLAnchorElement,
  RollTextLinkProps
>(({ children, className }, ref) => {
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
    <div
      className={clsxm(
        'cursor-pointer text-xs font-semibold uppercase',
        isDesktop && 'rollButton',
        className
      )}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={ref}
    >
      {children}
    </div>
  )
})
