import { ConfigView } from '@/types/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ViewSlice {
  appId: number
  logo: string
  accColor1: string
  accColor2: string
  seoTitle: string
  seoDescription: string
  sessionFieldsRequire: 'yes' | 'no'
}

const initialState: ViewSlice = {
  appId: 0,
  logo: 'pogovorim.svg',
  accColor1: '#3eb0a1', // $color-green-jungle-crayola
  accColor2: '#57c4b6', // $color-moderate-aquamarine
  seoTitle: 'Поговорим',
  seoDescription: '',
  sessionFieldsRequire: 'yes'
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    updateView: (state, action: PayloadAction<ConfigView>) => {
      state.logo = action.payload.logo || state.logo
      state.accColor1 = action.payload.acc_color_1 || state.accColor1
      state.accColor2 = action.payload.acc_color_2 || state.accColor2
      state.seoTitle = action.payload.seo_title || state.seoTitle
      state.seoDescription =
        action.payload.seo_description || state.seoDescription
      state.sessionFieldsRequire = action.payload.session_fields_require
    },
    setAppId: (state, action: PayloadAction<number>) => {
      state.appId = action.payload
    }
  }
})

export const { updateView, setAppId } = viewSlice.actions

export default viewSlice.reducer
