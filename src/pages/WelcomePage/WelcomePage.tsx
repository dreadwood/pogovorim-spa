import styles from './WelcomePage.module.scss'
import Logo from '@/components/Logo/Logo'
import PageLayout from '@/layout/PageLayout/PageLayout'
import BlockWelcome from '@/components/block/BlockWelcome/BlockWelcome'
import { useAppSelector } from '@/hooks/reducer'
import { AppRoute } from '@/const'
import { Navigate } from 'react-router-dom'

function WelcomePage(): JSX.Element {
  const { userId } = useAppSelector(state => state.user)

  if (userId) {
    return <Navigate to={AppRoute.Start} replace />
  }

  return (
    <PageLayout>
      <div className={styles.wrp}>
        <div className={styles.head}>
          <Logo />
        </div>
        <BlockWelcome />
      </div>
    </PageLayout>
  )
}

export default WelcomePage
