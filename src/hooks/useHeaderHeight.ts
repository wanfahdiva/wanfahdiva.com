import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

export const useHeaderHeight = (id = 'header') => {
  const [height, setHeight] = useState(80)
  const { width } = useWindowSize()

  useEffect(() => {
    const header = document.getElementById(id)
    if (header) {
      setHeight(header.getBoundingClientRect().height)
    }
  }, [id, width])

  return height || 0
}
