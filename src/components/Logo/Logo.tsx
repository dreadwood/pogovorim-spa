import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { AppRoute } from '@/const'
import styles from './Logo.module.scss'

interface LogoProps {
  className?: string
}

function Logo({ className }: LogoProps): JSX.Element {
  return (
    <Link className={clsx(styles.logo, className)} to={AppRoute.Root}>
      <img src="/img/logo-pogovorim.svg" width={121} height={36} alt="" />
    </Link>
  )
}

export default Logo
