import { Task, QuestionWithTask } from '@/types/common'

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
