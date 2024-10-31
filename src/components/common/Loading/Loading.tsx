import clsx from 'clsx'
import styles from './Loading.module.scss'

interface LoadingProps {
  className?: string
}

export default function Loading({ className }: LoadingProps): JSX.Element {
  return <div className={clsx(styles.loading, className)}>Загрузка...</div>
}
