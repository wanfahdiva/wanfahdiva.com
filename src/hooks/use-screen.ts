import { useWindowSize } from 'react-use'

export const useIsDesktop = (): boolean => {
  const { width } = useWindowSize()

  return width > 1024 && true
}
