import { Task, TaskQuestionWithTask } from '@/types/common'

export function transformTaskList(
  taskList: Task[] | undefined
): TaskQuestionWithTask[] | undefined {
  return taskList?.reduce<TaskQuestionWithTask[]>((acc, task) => {
    console.log(task.title)

    const questions = task.questions.map<TaskQuestionWithTask>(question => ({
      ...question,
      task: task.title
    }))

    return [...acc, ...questions]
  }, [])
}
