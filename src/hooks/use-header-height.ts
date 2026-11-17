import { useEffect, useState } from 'react'

export const useHeaderHeight = (): number => {
  const [height, setHeight] = useState(80)

  useEffect(() => {
    const header = document.querySelector('.header')
    if (!header) return
    const observer = new ResizeObserver(() => setHeight(header.getBoundingClientRect().height))
    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  return height || 0
}
