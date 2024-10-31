import clsx from 'clsx'
import styles from './PrivacyLink.module.scss'

interface PrivacyLinkProps {
  className?: string
}

export default function PrivacyLink({
  className
}: PrivacyLinkProps): JSX.Element {
  return (
    <a className={clsx(styles.link, className)} href="#">
      Политика конфиденциальности
    </a>
  )
}
