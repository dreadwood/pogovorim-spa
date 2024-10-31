import clsx from 'clsx'
import styles from './BlockChat.module.scss'
import BtnGradient from '@/components/btn/BtnGradient/BtnGradient'
import { useAppSelector } from '@/hooks/reducer'
import { APP_ID } from '@/const'
import {
  useGetCategoriesQuery,
  useGetTaskListQuery
} from '@/store/questionnaire.api'
import { useState } from 'react'
import CardMsgIn from '@/components/card/CardMsgIn/CardMsgIn'
import CardMsgOut from '@/components/card/CardMsgOut/CardMsgOut'

interface BlockChatProps {
  className?: string
}

function BlockChat({ className }: BlockChatProps): JSX.Element {
  const [indexOption, setIndexOption] = useState<number>(0)
  const { currentBlock } = useAppSelector(state => state.questionnaire)

  const { data: categories } = useGetCategoriesQuery(
    {
      block_uniq_id: currentBlock?.uniq_id || '',
      app_id: APP_ID
    },
    { selectFromResult: ({ data }) => ({ data }) }
  )

  const { data: taskOptionList } = useGetTaskListQuery(
    { category_uniq_id: categories ? categories[0].uniq_id : '' },
    { skip: !categories }
  )

  return (
    <div className={clsx(styles.chat, className)}>
      <div className={styles.wrp}>
        <div className={styles.content}>
          {taskOptionList && (
            <CardMsgIn
              text={taskOptionList[indexOption].title}
              className={styles.msg}
            />
          )}
          <CardMsgOut onNoClick={() => {}} onYesClick={() => {}} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.progress}>
            Номер вопроса
            <div className={styles.steps}>
              {indexOption + 1} из {taskOptionList?.length}
            </div>
          </div>
          <BtnGradient
            text="Следующий вопрос"
            onClick={() => setIndexOption(i => i + 1)}
          />
        </div>
      </div>
    </div>
  )
}

export default BlockChat
