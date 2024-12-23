import PageLayout from '@/layout/PageLayout/PageLayout'
import CardMsgIn from '@/components/card/CardMsgIn/CardMsgIn'
import Logo from '@/components/Logo/Logo'
import BlockForm from '@/components/block/BlockForm/BlockForm'
import PrivacyLink from '@/components/common/PrivacyLink/PrivacyLink'
import styles from './QuestionnairePage.module.scss'
import { useAppSelector } from '@/hooks/reducer'
import { Navigate } from 'react-router-dom'
import { AppRoute } from '@/const'

export default function QuestionnairePage(): JSX.Element {
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
        <div className={styles.center}>
          <div className={styles.content}>
            <CardMsgIn
              text={
                'Прежде чем начать проходить опрос, давайте заполним небольшую анкету!'
              }
              isSingle={true}
            />
            <BlockForm className={styles.form} />
          </div>
        </div>
        <PrivacyLink className={styles.link} />
      </div>
    </PageLayout>
  )
}
