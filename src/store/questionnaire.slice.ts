import { StatBlock } from '@/types/common'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QuestionnaireSlice {
  currentBlock: StatBlock | null
  currentBlockNum: number
  currentOption: number
}

const initialState: QuestionnaireSlice = {
  currentBlock: null,
  currentBlockNum: 0,
  currentOption: 0
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
    setCurrentOption: (state, action: PayloadAction<number>) => {
      state.currentOption = action.payload
    }
  }
})

export const { setCurrentBlock, setCurrentBlockNum, setCurrentOption } =
  questionnaireSlice.actions

export default questionnaireSlice.reducer
