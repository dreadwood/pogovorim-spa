import clsx from 'clsx'
import styles from './BtnGradient.module.scss'

interface BtnGradientProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

export default function BtnGradient({
  text,
  type = 'button',
  disabled,
  onClick,
  className
}: BtnGradientProps): JSX.Element {
  return (
    <button
      className={clsx(styles.btn, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  )
}
