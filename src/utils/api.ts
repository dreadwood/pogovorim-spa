import { Task, TaskQuestion } from '@/types/common'

export function transformTaskList(
  taskList: Task[] | undefined
): TaskQuestion[] | undefined {
  return taskList?.reduce<TaskQuestion[]>((acc, task) => {
    return [...acc, ...task.options]
  }, [])
}
