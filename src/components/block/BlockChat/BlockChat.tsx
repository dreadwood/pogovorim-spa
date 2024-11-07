import clsx from 'clsx'
import styles from './BlockChat.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/reducer'
import { APP_ID, AppRoute } from '@/const'
import {
  useGetCategoriesQueryState,
  useGetStatBlockDataQueryState,
  useGetTaskListQuery,
  useLazySendAnswerQuery
} from '@/store/questionnaire.api'
import { useEffect, useState } from 'react'
import CardMsgIn from '@/components/card/CardMsgIn/CardMsgIn'
import CardMsgOut from '@/components/card/CardMsgOut/CardMsgOut'
import { Answer } from '@/types/common'
import {
  decrementIndexCategory,
  incrementIndexCategory,
  setIndexQuestion
} from '@/store/questionnaire.slice'
import { useNavigate } from 'react-router-dom'
import BtnGradient from '@/components/btn/BtnGradient/BtnGradient'

interface BlockChatProps {
  className?: string
}

function BlockChat({ className }: BlockChatProps): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { currentBlock, indexCategory, indexQuestion } = useAppSelector(
    state => state.questionnaire
  )
  const { userId, clientId } = useAppSelector(state => state.user)
  const [fetchSendAnswer, { isLoading: isLoadingAnswer }] =
    useLazySendAnswerQuery()

  const [isFistRender, setIsFistRender] = useState<boolean>(true)

  const { data: blockData } = useGetStatBlockDataQueryState(
    {
      client_uniq_id: clientId as string,
      user_uniq_id: userId as string,
      app_id: APP_ID
    },
    {
      skip: !clientId || !userId
    }
  )

  const { data: categories } = useGetCategoriesQueryState(
    {
      block_uniq_id: currentBlock?.uniq_id as string,
      app_id: APP_ID
    },
    {
      skip: !currentBlock
    }
  )

  const {
    data: questionList,
    isFetching: isQuestionListFetching /*, refetch: refetchQuestionList */
  } = useGetTaskListQuery(
    {
      category_uniq_id: categories
        ? (categories[indexCategory].uniq_id as string)
        : ''
    },
    { skip: !categories }
  )

  const [disabledPrevBtn, setDisabledPrevBtn] = useState<boolean>(true)

  useEffect(() => {
    if (!blockData || !questionList || !isFistRender) return

    const index = questionList.findIndex(
      question => question.uniq_id === blockData.answers.current.uniq_id
    )

    dispatch(setIndexQuestion(index === -1 ? 0 : index))
    setIsFistRender(false)
  }, [questionList, blockData, isFistRender, dispatch])

  useEffect(() => {
    setDisabledPrevBtn(indexQuestion === 0 && indexCategory === 0)
  }, [indexQuestion, indexCategory])

  function previousQuestion() {
    switch (true) {
      case indexQuestion === 1 && indexCategory === 0: {
        dispatch(setIndexQuestion(indexQuestion - 1))
        break
      }
      case indexQuestion === 0 && indexCategory > 0: {
        if (!categories) {
          return
        }
        const prevIndexQuestion =
          categories[indexCategory - 1].questions_count - 1
        dispatch(decrementIndexCategory(prevIndexQuestion))
        break
      }
      case indexQuestion > 0: {
        dispatch(setIndexQuestion(indexQuestion - 1))
        break
      }
    }
  }

  function nextQuestion() {
    switch (true) {
      case indexQuestion + 1 === questionList?.length &&
        indexCategory + 1 === categories?.length:
        navigate(AppRoute.Start)
        break
      case indexQuestion + 1 === questionList?.length:
        dispatch(incrementIndexCategory())
        // refetchQuestionList()
        break
      default:
        dispatch(setIndexQuestion(indexQuestion + 1))
        break
    }
  }

  async function hadleAnswer(answer: Answer) {
    if (!questionList || !questionList[indexQuestion] || !userId) {
      console.error('Не могу отправить ответ')
      return
    }

    try {
      const data = await fetchSendAnswer({
        option_uniq_id: questionList[indexQuestion].uniq_id,
        user_uniq_id: userId,
        answer
      })

      if (!data.isSuccess) {
        console.error('Произошла ошибка при отправке ответа')
        return
      }
    } catch (err) {
      console.error('Произошла ошибка при отправке ответа', err)
    }

    nextQuestion()
  }

  return (
    <div className={clsx(styles.chat, className)}>
      <div className={styles.wrp}>
        <div className={styles.content}>
          {questionList && !isQuestionListFetching && (
            <CardMsgIn
              group={questionList[indexQuestion].task}
              text={questionList[indexQuestion].title}
              className={styles.msg}
            />
          )}

          <CardMsgOut
            onNoClick={hadleAnswer}
            onYesClick={hadleAnswer}
            // disabledBtns={disabledBtns || isLoadingAnswer}
            disabledBtns={isLoadingAnswer || isQuestionListFetching}
          />
        </div>
        <div className={styles.bottom}>
          <div className={styles.progress}>
            Номер вопроса
            <div className={styles.steps}>
              {indexQuestion + 1} из {questionList?.length}
            </div>
          </div>
          <BtnGradient
            text="Предыдущий вопрос"
            disabled={disabledPrevBtn}
            onClick={previousQuestion}
          />
        </div>
      </div>
    </div>
  )
}

export default BlockChat
