import PageLayout from '@/layout/PageLayout/PageLayout'
import CardMsgIn from '@/components/card/CardMsgIn/CardMsgIn'
import Logo from '@/components/Logo/Logo'
import BlockForm from '@/components/block/BlockForm/BlockForm'
import PrivacyLink from '@/components/common/PrivacyLink/PrivacyLink'
import styles from './QuestionnairePage.module.scss'

export default function QuestionnairePage(): JSX.Element {
  return (
    <PageLayout>
      <div className={styles.wrp}>
        <div className={styles.head}>
          <Logo />
        </div>
        <div className={styles.content}>
          <CardMsgIn
            text={
              'Прежде чем начать проходить опрос, давайте заполним небольшую анкету!'
            }
            isSingle={true}
          />
          <BlockForm className={styles.form} />
        </div>
        <PrivacyLink className={styles.link} />
      </div>
    </PageLayout>
  )
}
