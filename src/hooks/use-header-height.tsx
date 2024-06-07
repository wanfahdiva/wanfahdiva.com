import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

export const useHeaderHeight = (): number => {
  const [height, setHeight] = useState(80)
  const { width } = useWindowSize()

  useEffect(() => {
    const header = document.querySelector('.header')
    if (header) {
      setHeight(header.getBoundingClientRect().height)
    }
  }, [width])

  return height || 0
}
