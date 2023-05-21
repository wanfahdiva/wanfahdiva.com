import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useVisitedPage = () => {
  const router = useRouter()
  const [pageVisited, setPageVisited] = useState<boolean>(false)

  useEffect(() => {
    const currentPage = router.asPath.split('/')[1]
    if (typeof window !== 'undefined') {
      const getList = JSON.parse(localStorage.getItem('visitedPages') || '[]')
      if (getList.length === 0) {
        setPageVisited(false)
        setTimeout(() => {
          getList.push(currentPage)
          localStorage.setItem('visitedPages', JSON.stringify(getList))
        }, 3000)
      } else {
        if (!getList.includes(currentPage)) {
          getList.push(currentPage)
          localStorage.setItem('visitedPages', JSON.stringify(getList))
          setPageVisited(false)
        } else {
          setPageVisited(true)
        }
      }

      // remove the cookie when 3 hours have pass
      setTimeout(() => {
        localStorage.removeItem('visitedPages')
      }, 1000 * 60 * 60 * 3)
    }
  }, [router])

  return pageVisited
}
