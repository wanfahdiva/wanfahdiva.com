import { useEffect, useRef } from 'react'

interface ContainerLayoutProps {
  children: React.ReactNode
  className?: string
}

export const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  children,
  className,
}) => {
  const sectionRef = useRef<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current

      if (section) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const windowHeight = window.innerHeight
        const scrollY = window.scrollY

        if (scrollY > sectionTop + sectionHeight - windowHeight) {
          const opacity =
            1 - (scrollY - (sectionTop + sectionHeight - windowHeight)) / 350
          section.style.opacity = opacity
        } else {
          section.style.opacity = 1
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
