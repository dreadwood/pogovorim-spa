export interface Block {
  id: number
  uniq_id: string
  client_id: number
  position: number
  root_id: number
  title: string
  description: string
  created_at: string
  updated_at: string
  app_id: number
  publish: string
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
}

export interface StatBlockData {
  blocks: {
    [key: number]: StatBlock
  }
}

export interface UserUniqId {
  user_uniq_id: string
}

export interface Category {
  uniq_id: string
  title: string
  description: string
}

export interface Task {
  id: number
  uniq_id: string
  question: string
  options: TaskQuestion[]
}

export interface TaskQuestion {
  id: number
  uniq_id: string
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
