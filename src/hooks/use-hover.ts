import { RefObject, useEffect, useState } from 'react'

export function useHover<T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>): boolean {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => setValue(true)
    const handleMouseLeave = () => setValue(false)

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [elementRef])

  return value
}
