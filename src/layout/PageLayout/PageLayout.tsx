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
  const { acc_color_1, acc_color_2 } = useAppSelector(state => state.view)
  const style = {
    '--acc-color': acc_color_1,
    '--acc-color-additional': acc_color_2
  } as React.CSSProperties

  return (
    <div className={clsx(styles.page, className)} style={style}>
      {children}
    </div>
  )
}
