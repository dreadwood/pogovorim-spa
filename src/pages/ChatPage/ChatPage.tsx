import Logo from '@/components/Logo/Logo'
import styles from './ChatPage.module.scss'
import BlockCategories from '@/components/block/BlockCategories/BlockCategories'
import BlockChatTop from '@/components/block/BlockChatTop/BlockChatTop'
import BlockChat from '@/components/block/BlockChat/BlockChat'
import PageLayout from '@/layout/PageLayout/PageLayout'
import PrivacyLink from '@/components/common/PrivacyLink/PrivacyLink'
import { useGetCategoriesQuery } from '@/store/questionnaire.api'
import { APP_ID } from '@/const'
import ErrorDialog from '@/components/common/ErrorDialog/ErrorDialog'
import Loading from '@/components/common/Loading/Loading'
import { useAppSelector } from '@/hooks/reducer'

function ChatPage(): JSX.Element {
  const { currentBlock } = useAppSelector(state => state.questionnaire)

  const { isLoading } = useGetCategoriesQuery({
    block_uniq_id: currentBlock?.uniq_id || '',
    app_id: APP_ID
  })

  if (!currentBlock) {
    return <ErrorDialog msg={'Не удается данные блока опросника'} />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <PageLayout>
      <div className={styles.wrp}>
        <div className={styles.head}>
          <Logo />
        </div>

        <div className={styles.content}>
          <div className={styles.top}>
            <BlockChatTop />
          </div>
          <div className={styles.progress}>
            <BlockCategories />
          </div>
          <div className={styles.chat}>
            <BlockChat />
          </div>
        </div>

        <div className={styles.bottom}>
          <PrivacyLink className={styles.link} />
        </div>
      </div>
    </PageLayout>
  )
}

export default ChatPage
