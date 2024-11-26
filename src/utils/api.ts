import { ViewSlice } from '@/store/view.slice'
import { Task, QuestionWithTask, ConfigView } from '@/types/common'
import { ErrorRes } from '@/types/questionnaire.api'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function transformTaskList(
  taskList: Task[] | undefined
): QuestionWithTask[] | undefined {
  return taskList?.reduce<QuestionWithTask[]>((acc, task) => {
    const questions = task.questions.map<QuestionWithTask>(question => ({
      ...question,
      task: task.title
    }))

    return [...acc, ...questions]
  }, [])
}

export function transformErrResponse(
  err: FetchBaseQueryError | SerializedError
): string {
  const result =
    'status' in err
      ? `Status ${err.status}: ${(err.data as ErrorRes).message}`
      : JSON.stringify(err)

  return result
}

export function transformConfigView(conf: ConfigView): Partial<ViewSlice> {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(conf).filter(([_, value]) => value !== null)
  )
}
