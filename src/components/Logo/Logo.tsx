import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { AppRoute } from '@/const'
import styles from './Logo.module.scss'
import { useAppSelector } from '@/hooks/reducer'

interface LogoProps {
  className?: string
}

function Logo({ className }: LogoProps): JSX.Element {
  const { logo } = useAppSelector(state => state.view)

  return (
    <Link className={clsx(styles.logo, className)} to={AppRoute.Root}>
      <img src={logo} width={121} height={36} alt="" />
    </Link>
  )
}

export default Logo
