import { WD_LOGO_PATH } from '@/constants/brand'

import styles from './animate-provider.module.css'

export function DraftingSplash() {
  return (
    <div className={styles.drafting}>
      <svg viewBox="0 0 360 280" className={styles.drawing} aria-hidden="true" focusable="false">
        <rect x="41" y="42" width="290" height="208" rx="2" fill="#e5e5e2" />
        <rect x="35" y="36" width="290" height="208" rx="2" fill="#fbfbfa" stroke="#dcdcd9" strokeWidth=".7" />
        <path d="M50 74H312M50 209H312M66 54V229M299 54V229" className={styles.guides} />
        <path d="M180 54V229M50 142H312" className={styles.centerlines} />
        <path d="M35 50V36H49M311 36H325V50M325 230V244H311M49 244H35V230" className={styles.registration} />
        <g transform="translate(13 -25)">
          <path d={WD_LOGO_PATH} className={styles.outline} />
          <path d={WD_LOGO_PATH} className={styles.ink} pathLength="1" />
          <path d={WD_LOGO_PATH} className={styles.fill} fillRule="evenodd" />
        </g>
      </svg>
      <p className={styles.caption}>
        CRAFTING THE DETAILS<span aria-hidden="true">.</span>
      </p>
    </div>
  )
}
