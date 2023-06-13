import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

export const SectionExperience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const { setTheme } = useTheme()
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    // const socialmediaId = document.getElementById('social-media')
    // const scrollSection = gsap.utils.toArray('.scroll-section')
    // const headerId = document.getElementById('header')
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: '-300vw',
        ease: 'none',
        duration: 1.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '2010 top',
          scrub: 0.6,
          pin: true,
          // snap: {
          //   snapTo: 1 / (scrollSection.length - 1),
          //   duration: 0.2,
          // },
          onEnter: () => {
            // setTheme('light')
            // socialmediaId?.classList.add('hidden')
            // headerId?.classList.add('hidden')
          },
          onLeaveBack: () => {
            // setTheme('dark')
            // socialmediaId?.classList.remove('hidden')
            // headerId?.classList.remove('hidden')
          },
          onLeave: () => {
            // setTheme('dark')
            // socialmediaId?.classList.remove('hidden')
            // headerId?.classList.remove('hidden')
          },
          onEnterBack: () => {
            // setTheme('light')
            // socialmediaId?.classList.add('hidden')
            // headerId?.classList.add('hidden')
          },
        },
      }
    )

    ScrollTrigger.create({
      trigger: triggerRef.current,
      markers: false,
    })

    return () => {
      pin.kill()
    }
  }, [setTheme])

  return (
    <section className='overflow-hidden' id='experience'>
      <div ref={triggerRef}>
        <div ref={sectionRef} className='scroll-section-inner'>
          {[...Array(4)].map((_, i) => (
            <div className='scroll-section' key={i}>
              <h3>Experience {i + 1}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
