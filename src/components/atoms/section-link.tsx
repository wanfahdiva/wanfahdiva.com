'use client'

import { useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Link as ScrollLink } from 'react-scroll'

interface SectionLinkProps {
  to: string
  children: ReactNode
  className?: string
  onClick?: () => void
  label?: string
}

export function SectionLink({ to, children, className, onClick, label }: SectionLinkProps) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  if (pathname !== '/')
    return (
      <Link href={`/?section=${to}`} className={className} onClick={onClick} aria-label={label}>
        {children}
      </Link>
    )

  return (
    <ScrollLink
      to={to}
      smooth={!reduced}
      duration={750}
      offset={to === 'hero' ? 0 : -80}
      className={className}
      onClick={onClick}
      role="link"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          event.currentTarget.click()
        }
      }}
    >
      {children}
    </ScrollLink>
  )
}
