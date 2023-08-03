import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

export const useIsDesktop = (): boolean => {
  const { width } = useWindowSize()
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    if (width !== undefined) {
      setIsDesktop(width > 1024)
    }
  }, [width])

  return isDesktop
}
