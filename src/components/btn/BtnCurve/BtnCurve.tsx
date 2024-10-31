import clsx from 'clsx'
import styles from './BtnCurve.module.scss'
import Sprite from '@/components/Sprite/Sprite'

interface BtnCurveProps {
  type?: 'button' | 'submit' | 'reset'
  view?: 'arrow' | 'edit'
  disabled?: boolean
  className?: string
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

export default function BtnCurve({
  type = 'button',
  view = 'arrow',
  disabled,
  onClick,
  className
}: BtnCurveProps): JSX.Element {
  return (
    <button
      className={clsx(styles.btn, className)}
      type={type}
      disabled={disabled}
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
    </button>
  )
}
