import { createSlice } from '@reduxjs/toolkit'
import { addDays } from 'date-fns'

const initialState = {
  selectionRange: {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
  },
  days: [],
  plans: [],
}

export const drsSlice = createSlice({
  name: 'drs',
  initialState,
  reducers: {
    setSelectionRange: (state, action) => {
      state.selectionRange = action.payload
    },
    setDays: (state, action) => {
      state.days = action.payload
    },
    setPlans: (state, action) => {
      state.plans = action.payload
    },
  },
})

export const { setSelectionRange, setDays, setPlans } = drsSlice.actions

export default drsSlice.reducer
