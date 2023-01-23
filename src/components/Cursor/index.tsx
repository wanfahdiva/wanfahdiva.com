import cn from 'clsx'
import gsap from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

export const Cursor = () => {
  const cursor = useRef<any>()
  const [isGrab, setIsGrab] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  const onMouseMove = useCallback(
    ({ clientX, clientY }) => {
      gsap.to(cursor.current as any, {
        x: clientX,
        y: clientY,
        duration: hasMoved ? 2 : 0,
        ease: 'Expo.easeOut',
      })
      setHasMoved(true)
    },
    [hasMoved]
  )

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove, false)
    }
  }, [hasMoved, onMouseMove])

  useEffect(() => {
    let elements: any[] = []

    const onMouseEnter = () => {
      setIsPointer(true)
    }
    const onMouseLeave = () => {
      setIsPointer(false)
    }

    elements = [...document.querySelectorAll('button,a,input')]

    elements.forEach((element) => {
      element.addEventListener('mouseenter', onMouseEnter, false)
      element.addEventListener('mouseleave', onMouseLeave, false)
    })

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter, false)
        element.removeEventListener('mouseleave', onMouseLeave, false)
      })
    }
  }, [])

  useEffect(() => {
    let elementz: any[] = []

    const onMouseEnter = () => {
      setIsGrab(true)
    }
    const onMouseLeave = () => {
      setIsGrab(false)
    }

    elementz = [...document.querySelectorAll('button,a,input')]

    elementz.forEach((element) => {
      element.addEventListener('mouseenter', onMouseEnter, false)
      element.addEventListener('mouseleave', onMouseLeave, false)
    })

    return () => {
      elementz.forEach((element) => {
        element.removeEventListener('mouseenter', onMouseEnter, false)
        element.removeEventListener('mouseleave', onMouseLeave, false)
      })
    }
  }, [])

  return (
    <div
      style={{ opacity: hasMoved ? 1 : 0 }}
      className='hidden containerCursor md:block'
    >
      <div ref={cursor}>
        <div
          className={cn('cursor', isGrab && 'grab', isPointer && 'pointer')}
        />
      </div>
    </div>
  )
}
