'use client'

import { Element } from 'react-scroll'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  name?: string
}

export const Container: React.FC<ContainerProps> = ({ children, className, name = '' }) => {
  return (
    <Element name={name} className={className}>
      {children}
    </Element>
  )
}
