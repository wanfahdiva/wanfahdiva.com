import { WD_LOGO_PATH } from '@/constants/brand'
import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

import styles from './brand-mark.module.css'

type BrandMarkProps = SVGProps<SVGSVGElement> & { animated?: boolean }

export function BrandMark({ animated = false, className, ...props }: BrandMarkProps) {
  return (
    <svg
      viewBox="48 94 252 144"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      data-cursor="compact"
      className={cn(styles.mark, animated && styles.interactive, className)}
      {...props}
    >
      {animated && (
        <g className={styles.proof}>
          <g className={styles.registration} fill="none" stroke="currentColor" strokeWidth="0.6">
            <path d="M43 105V88H60M288 88H305V105M305 227V244H288M60 244H43V227" vectorEffect="non-scaling-stroke" />
            <path d="M27 160V172M21 166H33M321 160V172M315 166H327" vectorEffect="non-scaling-stroke" />
          </g>
          <path d={WD_LOGO_PATH} className={styles.keyline} vectorEffect="non-scaling-stroke" />
          <path d={WD_LOGO_PATH} className={styles.firstImpression} vectorEffect="non-scaling-stroke" />
          <path d={WD_LOGO_PATH} className={styles.secondImpression} fillRule="evenodd" />
        </g>
      )}
      <path d={WD_LOGO_PATH} fillRule="evenodd" className={styles.solid} />
      {animated && <path d="M42 86H54M48 86V246M42 246H54" className={styles.press} vectorEffect="non-scaling-stroke" />}
    </svg>
  )
}
