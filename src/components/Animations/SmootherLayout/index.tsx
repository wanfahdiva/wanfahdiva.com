import * as React from 'react'
import { useEffect } from 'react'

interface SmootherLayoutProps {
  children: React.ReactNode
  refreshSize?: boolean
}

export const SmootherLayout = ({
  children,
  refreshSize,
}: SmootherLayoutProps) => {
  useEffect(() => {
    const body = document.body
    const scrollWrap = document.getElementsByClassName(
      'smooth-scroll-wrapper'
    )[0] as HTMLElement
    const height = scrollWrap.getBoundingClientRect().height - 1
    const speed = 0.06

    let offset = 0
    body.style.height = Math.floor(height) + 'px'

    function smoothScroll() {
      offset += (window.pageYOffset - offset) * speed
      const scroll = 'translateY(-' + offset + 'px) translateZ(0)'
      scrollWrap.style.transform = scroll
      const callScroll = requestAnimationFrame(smoothScroll)
      return callScroll
    }

    smoothScroll()
  }, [refreshSize])
  return (
    <div className='smooth-scroll-wrapper'>
      <div className='content'>{children}</div>
    </div>
  )
}
