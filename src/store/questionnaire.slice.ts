import { StatBlock } from '@/types/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QuestionnaireSlice {
  currentBlock: StatBlock | null
  currentBlockNum: number
  indexCategory: number
  indexQuestion: number
}

const initialState: QuestionnaireSlice = {
  currentBlock: null,
  currentBlockNum: 0,
  indexCategory: 0,
  indexQuestion: 0
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
    setIndexCategory: (state, action: PayloadAction<number>) => {
      state.indexCategory = action.payload
    },
    incrementIndexCategory: state => {
      state.indexCategory = state.indexCategory + 1
      state.indexQuestion = 0
    },
    decrementIndexCategory: (state, action: PayloadAction<number>) => {
      state.indexCategory = state.indexCategory - 1
      state.indexQuestion = action.payload
    },
    setIndexQuestion: (state, action: PayloadAction<number>) => {
      state.indexQuestion = action.payload
    },
    resetQuestionnaireState: () => {
      return initialState
    }
  }
})

export const {
  setCurrentBlock,
  setCurrentBlockNum,
  setIndexCategory,
  incrementIndexCategory,
  decrementIndexCategory,
  setIndexQuestion,
  resetQuestionnaireState
} = questionnaireSlice.actions

export default questionnaireSlice.reducer
