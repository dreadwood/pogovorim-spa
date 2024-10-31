import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserSlice {
  clientId: string | null
  userId: string | null
}

const initialState: UserSlice = {
  clientId: null,
  userId: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setClientId: (state, action: PayloadAction<string>) => {
      state.clientId = action.payload
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    }
  }
})

export const { setClientId, setUserId } = userSlice.actions

export default userSlice.reducer
