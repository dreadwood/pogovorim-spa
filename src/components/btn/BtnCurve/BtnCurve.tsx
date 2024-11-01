import clsx from 'clsx'
import styles from './BtnCurve.module.scss'
import Sprite from '@/components/Sprite/Sprite'

interface BtnCurveProps {
  view?: 'arrow' | 'edit'
  className?: string
  isDisabled?: boolean
  onClick?: (evt: React.MouseEvent<HTMLDivElement>) => void
}

export default function BtnCurve({
  view = 'arrow',
  onClick,
  isDisabled,
  className
}: BtnCurveProps): JSX.Element {
  return (
    <div
      className={clsx(styles.btn, isDisabled && styles.disabled, className)}
      onClick={onClick}
    >
      <div className={styles.bg}>
        <Sprite name="btn-curve" width="42" height="101" />
      </div>
      <div className={styles.icon}>
        {view === 'arrow' && (
          <Sprite name="arrow-next-small" width="20" height="20" />
        )}
        {view === 'edit' && <Sprite name="pen" width="16" height="16" />}
      </div>
    </div>
  )
}
