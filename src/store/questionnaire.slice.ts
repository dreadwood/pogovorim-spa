import { StatBlock } from '@/types/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QuestionnaireSlice {
  currentBlock: StatBlock | null
  currentBlockNum: number
  currentCategory: number
}

const initialState: QuestionnaireSlice = {
  currentBlock: null,
  currentBlockNum: 0,
  currentCategory: 0
}

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setCurrentBlock: (state, action: PayloadAction<StatBlock>) => {
      state.currentBlock = action.payload
    },
    setCurrentBlockNum: (state, action: PayloadAction<number>) => {
      state.currentBlockNum = action.payload
    },
    setCurrentCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload
    },
    incrementCurrentCategory: state => {
      state.currentCategory = state.currentCategory + 1
    }
  }
})

export const {
  setCurrentBlock,
  setCurrentBlockNum,
  setCurrentCategory,
  incrementCurrentCategory
} = questionnaireSlice.actions

export default questionnaireSlice.reducer
