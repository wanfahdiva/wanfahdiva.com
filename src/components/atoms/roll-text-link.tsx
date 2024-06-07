'use client'

import { useIsDesktop } from '@/hooks/use-screen'
import { useEffect } from 'react'
import React from 'react'

import { cn } from '@/lib/utils'

interface RollTextLinkProps {
  children: React.ReactNode
  className?: string
}

// eslint-disable-next-line react/display-name
export const RollTextLink = React.forwardRef<HTMLAnchorElement, RollTextLinkProps>(({ children, className }, ref) => {
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const rollTexts = document.querySelectorAll('.rollText')
    if (!isDesktop) return
    rollTexts.forEach(
      (button) =>
        (button.innerHTML = '<div><span>' + button?.textContent?.trim().split('').join('</span><span>') + '</span></div>')
    )
  }, [isDesktop])

  return (
    <span ref={ref} className={cn('text-xss font-semibold uppercase', isDesktop && 'rollText', className)}>
      {children}
    </span>
  )
})
