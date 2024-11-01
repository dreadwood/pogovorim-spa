import clsx from 'clsx'
import styles from './PageLayout.module.scss'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface PageLayoutProps {
  children?: React.ReactNode
  className?: string
}

function PageLayout({ children, className }: PageLayoutProps): JSX.Element {
  const { pathname } = useLocation()

  useEffect(() => {
    const root = document.querySelector('#root')
    root?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return <div className={clsx(styles.page, className)}>{children}</div>
}

export default PageLayout
