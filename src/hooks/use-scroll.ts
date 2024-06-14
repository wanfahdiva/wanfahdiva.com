import { useEffect } from 'react'

export const useScroll = (callback: (e: number) => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Calculate the percentage of the page that has been scrolled
      const scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100

      callback(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback])
}
