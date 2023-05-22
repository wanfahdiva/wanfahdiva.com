import anime from 'animejs'
import { useEffect, useRef } from 'react'

interface ScrambelTextProps {
  text: string
  animationDelay?: number
}

export const ScrambelText: React.FC<ScrambelTextProps> = ({
  text,
  animationDelay = 150,
}) => {
  const animatedTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (animatedTextRef.current) {
      const animatedText = animatedTextRef.current
      animatedText.innerText = ''

      const characters: string[] = []
      for (let i = 0; i < text.length; i++) {
        characters.push(getRandomChar())
      }

      const spans = characters.map((character, index) => {
        const span = document.createElement('span')
        span.innerText = character
        span.style.opacity = '0'
        animatedText.appendChild(span)

        anime({
          targets: span,
          opacity: ['0', '1'],
          easing: 'easeInOutQuad',
          delay: animationDelay * index,
          duration: 400,
          complete: () => {
            span.innerText = text.charAt(index)
          },
        })

        return span
      })

      anime({
        targets: spans,
        opacity: ['1', '1'],
        easing: 'easeInOutQuad',
        delay: animationDelay * characters.length,
      })
    }
  }, [text, animationDelay])

  const getRandomChar = () => {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const randomIndex = Math.floor(Math.random() * characters.length)
    return characters[randomIndex]
  }

  return (
    <div ref={animatedTextRef} className='text-3xl font-semibold md:text-6xl' />
  )
}
