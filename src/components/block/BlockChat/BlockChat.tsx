import clsx from 'clsx'
import styles from './BlockChat.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/reducer'
import { APP_ID } from '@/const'
import {
  useGetCategoriesQuery,
  useGetTaskListQuery,
  useLazySendAnswerQuery
} from '@/store/questionnaire.api'
import { useState } from 'react'
import CardMsgIn from '@/components/card/CardMsgIn/CardMsgIn'
import CardMsgOut from '@/components/card/CardMsgOut/CardMsgOut'
import { Answer } from '@/types/common'
import { incrementCurrentCategory } from '@/store/questionnaire.slice'

interface BlockChatProps {
  className?: string
}

function BlockChat({ className }: BlockChatProps): JSX.Element {
  const dispatch = useAppDispatch()

  const { currentBlock, currentCategory, currentQuestion } = useAppSelector(
    state => state.questionnaire
  )
  const { userId } = useAppSelector(state => state.user)
  const [fetchSendAnswer] = useLazySendAnswerQuery()

  const [indexOption, setIndexOption] = useState<number>(currentQuestion)

  const { data: categories } = useGetCategoriesQuery(
    {
      block_uniq_id: currentBlock?.uniq_id || '',
      app_id: APP_ID
    },
    { selectFromResult: ({ data }) => ({ data }) }
  )

  const { data: taskOptionList, refetch: refetchTaskOptionList } =
    useGetTaskListQuery(
      {
        category_uniq_id: categories ? categories[currentCategory].uniq_id : ''
      },
      { skip: !categories }
    )

  function nextQuestion() {
    if (indexOption + 1 === taskOptionList?.length) {
      dispatch(incrementCurrentCategory())
      refetchTaskOptionList()
      setIndexOption(0)
    } else {
      setIndexOption(i => i + 1)
    }
  }

  async function hadleAnswer(answer: Answer) {
    if (!taskOptionList || !taskOptionList[indexOption] || !userId) {
      console.error('Не могу отправить ответ')
      return
    }

    const res = await fetchSendAnswer({
      option_uniq_id: taskOptionList[indexOption].uniq_id,
      user_uniq_id: userId,
      answer
    })

    if (!res.isSuccess) {
      console.error('Произошла ошибка при отправке ответа')
      return
    }

    nextQuestion()
  }

  return (
    <div className={clsx(styles.chat, className)}>
      <div className={styles.wrp}>
        <div className={styles.content}>
          {taskOptionList && (
            <CardMsgIn
              group={taskOptionList[indexOption].task}
              text={taskOptionList[indexOption].title}
              className={styles.msg}
            />
          )}
          <CardMsgOut onNoClick={hadleAnswer} onYesClick={hadleAnswer} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.progress}>
            Номер вопроса
            <div className={styles.steps}>
              {indexOption + 1} из {taskOptionList?.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockChat
