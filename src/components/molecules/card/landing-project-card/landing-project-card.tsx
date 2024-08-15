'use client'

import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

import { NextImage } from '@/components/atoms/next-image'

interface LandingProjectCardProps {
  title: string
  description: string
  src: string
  url: string
  index: number
  progress: MotionValue<number>
  range: number[]
  targetScale: number
}

export const LandingProjectCard = ({
  title,
  description,
  src,
  url,
  index,
  progress,
  range,
  targetScale
}: LandingProjectCardProps) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  const getColor = (i: number) => {
    switch (i) {
      case 0:
        return '#A6ABBA'
      case 1:
        return '#C6CBDB'
      case 2:
        return '#CBD0DE'
      case 3:
        return '#D6DBEB'

      default:
        break
    }
  }

  return (
    <div className="sticky top-0 flex items-center justify-center h-screen">
      <Link href={url} target="_blank" passHref>
        <motion.div
          style={{ backgroundColor: getColor(index), scale, top: `calc(1vh + ${index * 25}px)` }}
          className="flex flex-col relative md:h-[400px] w-11/12 mx-auto md:w-[850px] rounded-[25px] p-[50px] origin-top"
        >
          <div>
            <h2
              className="text-center m-0 text-2xl md:text-[28px] font-semibold text-onyx"
              style={{ textShadow: '3px 2px 1px #ffffe3' }}
            >
              {title}
            </h2>

            <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row h-full mt-[50px] gap-[50px] text-[#1F2E48]">
              <div className="md:w-3/5 relative top-[10%]">
                <p className="text-[16px] first-letter:text-[28px] first-letter:font-['Title']">{description}</p>
              </div>

              <div className="relative h-48 overflow-hidden rounded-lg shadow md:h-44 md:w-2/5">
                <motion.div className="w-full h-full" style={{ scale: imageScale }}>
                  <NextImage layout="fill" src={src} alt={title} className="object-cover" useSkeleton />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}
