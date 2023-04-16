import { useEffect, useRef } from 'react'

// TODO: Hide if cursor not moved
export const Cursor = () => {
  const secondaryCursor = useRef<any>(null)
  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  })

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event

      const mouseX = clientX
      const mouseY = clientY

      positionRef.current.mouseX =
        mouseX - secondaryCursor.current.clientWidth / 2
      positionRef.current.mouseY =
        mouseY - secondaryCursor.current.clientHeight / 2
    })

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [])

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse)
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX
        positionRef.current.destinationY = mouseY
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX
          positionRef.current.destinationY = mouseY
        } else {
          positionRef.current.destinationX += distanceX
          positionRef.current.destinationY += distanceY
        }
      }
      if (secondaryCursor && secondaryCursor.current)
        secondaryCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`
    }
    followMouse()
  }, [])
  return (
    <div className='cursor-wrapper default'>
      <div className='secondary-cursor' ref={secondaryCursor}></div>
    </div>
  )
}
