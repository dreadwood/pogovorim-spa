import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { questionnaireApi } from './questionnaire.api'
import questionnaireSlice from './questionnaire.slice'
import userSlice from './user.slice'

export const store = configureStore({
  reducer: {
    [questionnaireApi.reducerPath]: questionnaireApi.reducer,
    questionnaire: questionnaireSlice,
    user: userSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([questionnaireApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
