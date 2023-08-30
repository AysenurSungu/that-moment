import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import drsReducer from './features/drsSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [
          'drs.selectionRange.startDate',
          'drs.selectionRange.endDate',
        ],
        ignoredActions: ['drs/setSelectionRange', 'drs/setDays'],
      },
    }),
  reducer: {
    drs: drsReducer,
    auth: authReducer,
  },
  devTools: import.meta.env.PROD,
})
