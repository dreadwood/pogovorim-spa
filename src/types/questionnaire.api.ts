import { Block, Category, Config, StatBlockData, Task } from './common'

export interface IBlockListReq {
  client_uniq_id: string
  app_id: number
}

export interface IBlockListRes {
  success: boolean
  data?: Block[]
  message: string | boolean
}

export interface IStatBlockListReq {
  client_uniq_id: string
  user_uniq_id: string
  app_id: number
}

export interface IStatBlockListRes {
  success: boolean
  data?: StatBlockData
  message: string | boolean
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

export interface IUserIdRes {
  success: boolean
  data?: {
    user_uniq_id: string
  }
  message: boolean
}

export interface ICategoriesReq {
  block_uniq_id: string
  app_id: number
}

export interface ICategoriesRes {
  success: boolean
  data?: Category[]
  message: boolean
}

export interface ITaskListReq {
  category_uniq_id: string
}

export interface ITaskListRes {
  success: boolean
  data?: Task[]
  message: boolean
}

export interface IConfigReq {
  domain: string
}
export interface IConfigRes {
  success: boolean
  data?: Config
  message: boolean
}
