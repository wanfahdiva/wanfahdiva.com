import { useEffect, useState } from 'react'

export const useScrollPosition = () => {
  const [showNavbar, setShowNavbar] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos === 0)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  return showNavbar
}
