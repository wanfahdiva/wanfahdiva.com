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
          'custom-link inline-flex items-center transition-colors duration-200 ease-in-out',
          'pb-1 focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          className
        )}
      >
        {children}
      </UnstyledLink>
    )
  }
)

export default UnderlineLink
