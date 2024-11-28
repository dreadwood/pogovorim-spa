import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ViewSlice {
  appId: number
  logo: string
  acc_color_1: string
  acc_color_2: string
  seo_title: string
  seo_description: string
  session_fields_require: 'yes' | 'no'
}

const initialState: ViewSlice = {
  appId: 0,
  logo: 'pogovorim.svg',
  acc_color_1: '#3eb0a1', // $color-green-jungle-crayola
  acc_color_2: '#57c4b6', // $color-moderate-aquamarine
  seo_title: 'Поговорим',
  seo_description: '',
  session_fields_require: 'yes'
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    updateView: (state, action: PayloadAction<Partial<ViewSlice>>) => {
      Object.assign(state, action.payload)
    },
    setAppId: (state, action: PayloadAction<number>) => {
      state.appId = action.payload
    }
  }
})

export const { updateView, setAppId } = viewSlice.actions

export default viewSlice.reducer
