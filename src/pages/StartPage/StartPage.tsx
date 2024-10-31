import PageLayout from '@/layout/PageLayout/PageLayout'
import styles from './StartPage.module.scss'
import Logo from '@/components/Logo/Logo'
import { useGetStatBlockDataQuery } from '@/store/questionnaire.api'
import CardBlock from '@/components/card/CardBlock/CardBlock'
import PrivacyLink from '@/components/common/PrivacyLink/PrivacyLink'
import Loading from '@/components/common/Loading/Loading'
import { APP_ID } from '@/const'
import { useAppSelector } from '@/hooks/reducer'

function StartPage(): JSX.Element {
  const { clientId, userId } = useAppSelector(state => state.user)

  const { data: blockData, isLoading: isLoadingBlockData } =
    useGetStatBlockDataQuery(
      {
        client_uniq_id: clientId as string,
        user_uniq_id: userId as string,
        app_id: APP_ID
      },
      { refetchOnMountOrArgChange: true }
    )

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
