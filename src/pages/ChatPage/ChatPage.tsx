import Logo from '@/components/Logo/Logo'
import styles from './ChatPage.module.scss'
import BlockCategories from '@/components/block/BlockCategories/BlockCategories'
import BlockChatTop from '@/components/block/BlockChatTop/BlockChatTop'
import BlockChat from '@/components/block/BlockChat/BlockChat'
import PageLayout from '@/layout/PageLayout/PageLayout'
import PrivacyLink from '@/components/common/PrivacyLink/PrivacyLink'
import {
  useGetCategoriesQuery,
  useGetStatBlockDataQuery
} from '@/store/questionnaire.api'
import { APP_ID, AppRoute } from '@/const'
import Loading from '@/components/common/Loading/Loading'
import { useAppDispatch, useAppSelector } from '@/hooks/reducer'
import { useEffect } from 'react'
import {
  setCurrentBlock,
  setCurrentBlockNum,
  setCurrentCategory
} from '@/store/questionnaire.slice'
import { Navigate, useParams } from 'react-router-dom'

function ChatPage(): JSX.Element {
  const dispatch = useAppDispatch()
  const { uniqId: blockId } = useParams()
  const { clientId, userId } = useAppSelector(state => state.user)

  const { data: blockData, isLoading: isLoadingBlockData } =
    useGetStatBlockDataQuery(
      {
        client_uniq_id: clientId as string,
        user_uniq_id: userId as string,
        app_id: APP_ID
      },
      { skip: !blockId }
    )

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery(
      {
        block_uniq_id: blockId || '',
        app_id: APP_ID
      },
      { skip: !blockId }
    )

  useEffect(() => {
    if (blockData) {
      let blockNum = 1
      const block = Object.values(blockData.blocks).find((block, i) => {
        blockNum = i + 1
        return block.uniq_id === blockId
      })

      // TODO: 2024-11-01 / add redirect
      if (block) {
        dispatch(setCurrentBlock(block))
        dispatch(setCurrentBlockNum(blockNum))
      }
    }
  }, [blockId, blockData, dispatch])

  // установка текущей категории
  useEffect(() => {
    if (!blockData || !categories) return

    const currentCategory = categories.findIndex(
      category =>
        category.uniq_id === blockData.answers.current.category_uniq_id
    )

    dispatch(setCurrentCategory(currentCategory))
  }, [blockData, categories, dispatch])

  if (!userId) {
    return <Navigate to={AppRoute.Root} replace />
  }

  if (isLoadingCategories || isLoadingBlockData) {
    return <Loading />
  }

  return (
    <PageLayout>
      <div className={styles.wrp}>
        <div className={styles.head}>
          <Logo />
        </div>
        <div className={styles.center}>
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
        </div>

        <div className={styles.bottom}>
          <PrivacyLink className={styles.link} />
        </div>
      </div>
    </PageLayout>
  )
}

export default ChatPage
