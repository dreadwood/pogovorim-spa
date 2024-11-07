import { Answer, Block, Category, Config, StatBlockData, Task } from './common'

interface Respons {
  success: boolean
  message: string | boolean
}

export interface IBlockListReq {
  client_uniq_id: string
  app_id: number
}

export interface IBlockListRes extends Respons {
  data?: Block[]
}

export interface IStatBlockListReq {
  client_uniq_id: string
  user_uniq_id: string
  app_id: number
}

export interface IStatBlockListRes extends Respons {
  data?: StatBlockData
}

export interface IUserIdReq {
  client_uniq_id: string
  app_id: number
  email: string
  first_name: string
  second_name: string
  third_name: string
  sex: string
  age: number
  work_experience: number
  department: string
}

export interface IUserIdRes extends Respons {
  data?: {
    user_uniq_id: string
  }
}

export interface ICategoriesReq {
  block_uniq_id: string
  app_id: number
}

export interface ICategoriesRes extends Respons {
  data?: Category[]
}

export interface ITaskListReq {
  category_uniq_id: string
}

export interface ITaskListRes extends Respons {
  data?: Task[]
}

export interface IAnswerReq {
  option_uniq_id: string
  user_uniq_id: string
  answer: Answer
}

export interface IAnswerRes extends Respons {
  data?: {
    success: true
  }
}

export interface IConfigReq {
  domain: string
}

export interface IConfigRes extends Respons {
  data?: Config
}
