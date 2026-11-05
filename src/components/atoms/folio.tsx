'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import styles from './folio.module.css'

// Running folio in the page gutter, like a book: which chapter is at the reading line.
const CHAPTERS = [
  { id: 'about', number: '01', title: 'About' },
  { id: 'selected-projects', number: '02', title: 'Selected work' },
  { id: 'contact', number: '03', title: 'Contact' }
]

export const Folio = () => {
  const [active, setActive] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const sections = CHAPTERS.map(({ id }) => document.getElementById(id))
    const visible = new Set<number>()
    // A one-pixel reading line across the middle of the viewport: no scroll listener, no layout reads.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = sections.indexOf(entry.target as HTMLElement)
          if (entry.isIntersecting) visible.add(index)
          else visible.delete(index)
        })
        setActive(visible.size ? Math.max(...Array.from(visible)) : null)
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((section) => section && observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const chapter = active === null ? null : CHAPTERS[active]
  // Portalled to <body>: the page wrapper's filter would otherwise make `fixed` relative to the whole page.
  if (!mounted) return null

  return createPortal(
    <div className={styles.folio} data-visible={chapter !== null} aria-hidden="true">
      {chapter && (
        <span key={chapter.id} className={styles.entry}>
          <span className={styles.number}>{chapter.number}</span>
          <span className={styles.rule} />
          {chapter.title}
          <span className={styles.total}>/ 03</span>
        </span>
      )}
    </div>,
    document.body
  )
}
