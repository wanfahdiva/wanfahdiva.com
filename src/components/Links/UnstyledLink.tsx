import Link from 'next/link'
import * as React from 'react'

import clsxm from '@/lib/clsxm'

export type UnstyledLinkProps = {
  href: string
  children: React.ReactNode
  openNewTab?: boolean
  className?: string
} & React.ComponentPropsWithRef<'a'>

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#')

    if (!isNewTab) {
      return (
        <Link href={href}>
          <a ref={ref} {...rest} className={className}>
            {children}
          </a>
        </Link>
      )
    }

    return (
      <a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
        className={clsxm('cursor-newtab', className)}
      >
        {children}
      </a>
    )
  }
)

export default UnstyledLink
