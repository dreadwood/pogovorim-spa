import clsx from 'clsx'
import styles from './PageLayout.module.scss'
import { useAppSelector } from '@/hooks/reducer'

interface PageLayoutProps {
  children?: React.ReactNode
  className?: string
}

export default function PageLayout({
  children,
  className
}: PageLayoutProps): JSX.Element {
  const { accColor1, accColor2 } = useAppSelector(state => state.view)
  const style = {
    '--acc-color': accColor1,
    '--acc-color-additional': accColor2
  } as React.CSSProperties

  return (
    <div className={clsx(styles.page, className)} style={style}>
      {children}
    </div>
  )
}
