import { Element } from 'react-scroll'

interface ContainerLayoutProps {
  children: React.ReactNode
  className?: string
  id?: string
  name?: string
}

export const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
  className,
  id = '',
  name = '',
}) => {
  return (
    <Element name={name}>
      <div className={className} id={id}>
        {children}
      </div>
    </Element>
  )
}
