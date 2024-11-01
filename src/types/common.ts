export interface Block {
  uniq_id: string
  title: string
  description: string
}

export interface StatBlock {
  id: number
  uniq_id: string
  title: string
  description: string
  task_count: number
  option_count: number
  answers: number
  percent: string
  categories_count: string
}

export interface Breakpoint {
  id: number
  uniq_id: string
  title: string
  type: string
  task_id: number
  category_uniq_id: string
  category_id: number
  block_uniq_id: string
  block_id: number
}

export interface StatBlockData {
  blocks: {
    [key: number]: StatBlock
  }
  answers: {
    current: Breakpoint
  }
}

export interface UserUniqId {
  user_uniq_id: string
}

export interface Category {
  id: number
  uniq_id: string
  title: string
  description: string
  questions_count: number
}

export interface Task {
  id: number
  uniq_id: string
  title: string
  questions: Question[]
}

export interface Question {
  id: number
  uniq_id: string
  title: string
  type: string
}

export interface QuestionWithTask {
  id: number
  uniq_id: string
  task: string
  title: string
  type: string
}

export interface Config {
  uniq_id: string
  domain: string
  title: string
  apps: AppData[]
}

export interface AppData {
  id: number
  title: string
}

export type Answer = 'yes' | 'no'
