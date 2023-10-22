import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import dateTimeReducer from "../features/dateTime/dateTimeSlice"

export const store = configureStore({
  reducer: {
    dateTime: dateTimeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
