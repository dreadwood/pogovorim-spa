import clsx from 'clsx'
import styles from './BlockChat.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/reducer'
import { APP_ID, AppRoute } from '@/const'
import {
  useGetCategoriesQuery,
  useGetStatBlockDataQuery,
  useGetTaskListQuery,
  useLazySendAnswerQuery
} from '@/store/questionnaire.api'
import { useEffect, useState } from 'react'
import CardMsgIn from '@/components/card/CardMsgIn/CardMsgIn'
import CardMsgOut from '@/components/card/CardMsgOut/CardMsgOut'
import { Answer } from '@/types/common'
import { incrementCurrentCategory } from '@/store/questionnaire.slice'
import { useNavigate } from 'react-router-dom'

interface BlockChatProps {
  className?: string
}

function BlockChat({ className }: BlockChatProps): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { currentBlock, currentCategory } = useAppSelector(
    state => state.questionnaire
  )
  const { userId, clientId } = useAppSelector(state => state.user)
  const [fetchSendAnswer] = useLazySendAnswerQuery()

  const [indexQuestion, setIndexQuestion] = useState<number>(0)

  const { data: blockData } = useGetStatBlockDataQuery(
    {
      client_uniq_id: clientId as string,
      user_uniq_id: userId as string,
      app_id: APP_ID
    },
    { selectFromResult: ({ data }) => ({ data }) }
  )

  const { data: categories } = useGetCategoriesQuery(
    {
      block_uniq_id: currentBlock?.uniq_id || '',
      app_id: APP_ID
    },
    { selectFromResult: ({ data }) => ({ data }) }
  )

  const { data: questionList, refetch: refetchQuestionList } =
    useGetTaskListQuery(
      {
        category_uniq_id: categories ? categories[currentCategory].uniq_id : ''
      },
      { skip: !categories }
    )

  useEffect(() => {
    if (!blockData || !questionList) return

    const findIndex = questionList.findIndex(
      question => question.uniq_id === blockData.answers.current.uniq_id
    )

    setIndexQuestion(findIndex === -1 ? 0 : findIndex)
  }, [questionList, blockData, dispatch])

  function nextQuestion() {
    switch (true) {
      case indexQuestion + 1 === questionList?.length &&
        currentCategory + 1 === categories?.length:
        navigate(AppRoute.Start)
        break
      case indexQuestion + 1 === questionList?.length:
        dispatch(incrementCurrentCategory())
        setIndexQuestion(0)
        refetchQuestionList()
        break
      default:
        setIndexQuestion(i => i + 1)
        break
    }
  }

  async function hadleAnswer(answer: Answer) {
    if (!questionList || !questionList[indexQuestion] || !userId) {
      console.error('Не могу отправить ответ')
      return
    }

    const res = await fetchSendAnswer({
      option_uniq_id: questionList[indexQuestion].uniq_id,
      user_uniq_id: userId,
      answer
    })

    if (!res.isSuccess) {
      console.error('Произошла ошибка при отправке ответа')
      return
    }

    nextQuestion()
  }

  console.log('indexQuestion', indexQuestion)

  return (
    <div className={clsx(styles.chat, className)}>
      <div className={styles.wrp}>
        <div className={styles.content}>
          {questionList && (
            <CardMsgIn
              group={questionList[indexQuestion].task}
              text={questionList[indexQuestion].title}
              className={styles.msg}
            />
          )}

          <CardMsgOut onNoClick={hadleAnswer} onYesClick={hadleAnswer} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.progress}>
            Номер вопроса
            <div className={styles.steps}>
              {indexQuestion + 1} из {questionList?.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockChat
