import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_API } from '@/const'
import { RootState } from '.'
import {
  IBlockListReq,
  IBlockListRes,
  ICategoriesReq,
  ICategoriesRes,
  IConfigReq,
  IConfigRes,
  IStatBlockListReq,
  IStatBlockListRes,
  ITaskListReq,
  ITaskListRes,
  IUserIdReq,
  IUserIdRes
} from '@/types/questionnaire.api'
import {
  Block,
  Category,
  Config,
  StatBlockData,
  TaskQuestion,
  UserUniqId
} from '@/types/common'
import { transformTaskList } from '@/utils/api'

export const questionnaireApi = createApi({
  reducerPath: 'questionnaireApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_API
  }),
  endpoints: build => ({
    getBlockList: build.query<Block[] | undefined, IBlockListReq>({
      query: body => ({
        url: 'get-blocks',
        method: 'POST',
        body
      }),
      transformResponse: (response: IBlockListRes) => response.data
    }),
    getStatBlockData: build.query<StatBlockData | undefined, IStatBlockListReq>(
      {
        query: body => ({
          url: 'stat',
          method: 'POST',
          body
        }),
        transformResponse: (response: IStatBlockListRes) => response.data
      }
    ),
    getUserId: build.query<UserUniqId | undefined, IUserIdReq>({
      query: body => ({
        url: 'set-session',
        method: 'POST',
        body
      }),
      transformResponse: (response: IUserIdRes) => response.data
    }),
    getCategories: build.query<Category[] | undefined, ICategoriesReq>({
      query: body => ({
        url: 'get-categories',
        method: 'POST',
        body
      }),
      transformResponse: (response: ICategoriesRes) => response.data
    }),
    getTaskList: build.query<TaskQuestion[] | undefined, ITaskListReq>({
      query: body => ({
        url: 'get-tasks',
        method: 'POST',
        body
      }),
      transformResponse: (response: ITaskListRes) =>
        transformTaskList(response.data)
    }),
    getConfig: build.query<Config | undefined, IConfigReq>({
      query: body => ({
        url: 'get-config',
        method: 'POST',
        body
      }),
      transformResponse: (response: IConfigRes) => response.data
    })
  })
})

export const {
  useGetBlockListQuery,
  useGetStatBlockDataQuery,
  useLazyGetUserIdQuery,
  useGetCategoriesQuery,
  useGetConfigQuery,
  useGetTaskListQuery
} = questionnaireApi

export const selectGetDicts = (state: RootState) =>
  state[questionnaireApi.reducerPath]
