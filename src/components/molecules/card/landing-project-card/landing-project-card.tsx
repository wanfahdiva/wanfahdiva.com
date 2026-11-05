'use client'

import { MotionValue, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { CSSProperties, useRef } from 'react'

import { PaintReveal } from '@/components/atoms/paint-reveal'

import styles from './landing-project-card.module.css'

interface LandingProjectCardProps {
  title: string
  description: string
  src: string
  url: string
  index: number
  total: number
  category: string
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
  total,
  category,
  progress,
  range,
  targetScale
}: LandingProjectCardProps) => {
  const container = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.055, 1])
  const scale = useTransform(progress, range, [1, targetScale])
  const number = String(index + 1).padStart(2, '0')
  const domain = new URL(url).hostname

  return (
    <div ref={container} className={styles.stage} role="listitem" style={{ '--card-index': index } as CSSProperties}>
      <motion.article
        className={styles.card}
        style={{ scale: reduced ? 1 : scale }}
        aria-labelledby={`project-${index}-title`}
      >
        <div className={styles.cardTop}>
          <span className={styles.catalogue}>PROJECT / {number}</span>
          <span className={styles.category}>{category}</span>
          <span className={styles.pagination}>
            {number} — {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.details}>
            <span className={styles.number} aria-hidden="true">
              {number}.
            </span>
            <h3 id={`project-${index}-title`}>{title}</h3>
            <p>{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={styles.link}
              aria-label={`Visit ${title} website (opens in a new tab)`}
            >
              <span>Visit website</span>
              <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </div>
          <figure className={styles.preview}>
            <div className={styles.browserBar} aria-hidden="true">
              <span className={styles.browserDots}>
                <i />
                <i />
                <i />
              </span>
              <span>{domain}</span>
              <ArrowUpRight size={10} strokeWidth={1.2} />
            </div>
            <div className={styles.imageWindow}>
              <motion.div className={styles.imageMotion} style={{ scale: reduced ? 1 : imageScale }}>
                <Image
                  src={src}
                  alt={`${title} website preview`}
                  fill
                  sizes="(max-width: 760px) 85vw, (max-width: 1200px) 48vw, 650px"
                  quality={85}
                  className={styles.image}
                />
              </motion.div>
              <PaintReveal seed={index + 3} />
            </div>
            <figcaption>
              <span>WEB / {number}</span>
              <span>{domain}</span>
            </figcaption>
          </figure>
        </div>
        <div className={styles.cardFoot} aria-hidden="true">
          <span>WANFAH DIVA / SELECTED WORK</span>
          <span className={styles.footRule} />
          <span>{number}</span>
        </div>
      </motion.article>
    </div>
  )
}
