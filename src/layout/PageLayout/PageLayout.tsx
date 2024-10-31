import clsx from 'clsx'
import styles from './PageLayout.module.scss'

interface PageLayoutProps {
  children?: React.ReactNode
  className?: string
}

function PageLayout({ children, className }: PageLayoutProps): JSX.Element {
  return <div className={clsx(styles.page, className)}>{children}</div>
}

export default PageLayout
