import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ViewSlice {
  logo: string
  acc_color_1: string
  acc_color_2: string
  seo_title: string
  seo_description: string
  session_fields_require: 'yes'
}

const initialState: ViewSlice = {
  logo: '/img/logo-pogovorim.svg',
  acc_color_1: '#3eb0a1', // $color-green-jungle-crayola
  acc_color_2: '#eef9f9', // $color-periwinkle-crayola
  seo_title: 'Поговорим',
  seo_description: '',
  session_fields_require: 'yes'
}

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    updateView: (state, action: PayloadAction<Partial<ViewSlice>>) => {
      state = {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { updateView } = viewSlice.actions

export default viewSlice.reducer
