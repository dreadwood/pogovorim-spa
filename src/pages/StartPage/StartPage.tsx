import PageLayout from '@/layout/PageLayout/PageLayout'
import styles from './StartPage.module.scss'
import Logo from '@/components/Logo/Logo'
import { useGetStatBlockDataQuery } from '@/store/questionnaire.api'
import CardBlock from '@/components/card/CardBlock/CardBlock'
import PrivacyLink from '@/components/common/PrivacyLink/PrivacyLink'
import Loading from '@/components/common/Loading/Loading'
import { APP_ID, AppRoute } from '@/const'
import { useAppSelector } from '@/hooks/reducer'
import { Navigate } from 'react-router-dom'

function StartPage(): JSX.Element {
  const { clientId, userId } = useAppSelector(state => state.user)

  const { data: blockData, isLoading: isLoadingBlockData } =
    useGetStatBlockDataQuery(
      {
        client_uniq_id: clientId || '',
        user_uniq_id: userId || '',
        app_id: APP_ID
      },
      { refetchOnMountOrArgChange: true, skip: !clientId || !userId }
    )

  if (blockData) {
    const isNoQuestions = Object.values(blockData.blocks).every(block => {
      return block.answers === block.option_count
    })

    if (isNoQuestions) {
      return <Navigate to={AppRoute.Finish} replace />
    }
  }

  if (!userId) {
    return <Navigate to={AppRoute.Root} replace />
  }

  if (isLoadingBlockData) {
    return <Loading />
  }

  return (
    <PageLayout>
      <div className={styles.wrp}>
        <div className={styles.head}>
          <Logo />
        </div>
        <div className={styles.center}>
          <div className={styles.list}>
            {blockData &&
              Object.values(blockData.blocks).map((block, i) => {
                const isDisabled =
                  blockData.answers.current.block_uniq_id !== block.uniq_id

                return (
                  <CardBlock
                    block={block}
                    number={i + 1}
                    isDisabled={isDisabled}
                    key={block.id}
                  />
                )
              })}
          </div>
        </div>

        <PrivacyLink className={styles.link} />
      </div>
    </PageLayout>
  )
}

export default StartPage
