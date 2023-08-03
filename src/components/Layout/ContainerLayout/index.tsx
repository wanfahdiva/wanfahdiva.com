import { Element } from 'react-scroll'

interface ContainerLayoutProps {
  children: React.ReactNode
  className?: string
  name?: string
}

export const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
  className,
  name = '',
}) => {
  return (
    <Element name={name} className={className}>
      {children}
    </Element>
  )
}
