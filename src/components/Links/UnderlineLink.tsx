import * as React from 'react'

import clsxm from '@/lib/clsxm'

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/Links/UnstyledLink'

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center font-medium',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2',
          // 'custom-link animated-underline border-dark border-b border-dotted hover:border-black/0',
          className
        )}
      >
        {children}
      </UnstyledLink>
    )
  }
)

export default UnderlineLink
