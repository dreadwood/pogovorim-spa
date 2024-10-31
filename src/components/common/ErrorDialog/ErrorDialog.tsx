import clsx from 'clsx'
import styles from './ErrorDialog.module.scss'

interface ErrorDialogProps {
  msg?: string
  className?: string
}

export default function ErrorDialog({
  msg,
  className
}: ErrorDialogProps): JSX.Element {
  return (
    <div className={clsx(styles.error, className)}>
      <div>
        Ошибка приложения 😓 <br /> Попробуйте позже.
        {msg && <p className={styles.msg}>{msg}</p>}
      </div>
    </div>
  )
}
