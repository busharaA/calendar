import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import dateTimeReducer from "../features/dateTime/dateTimeSlice"
import commitsReducer from "../features/commits/commitsSlice"

export const store = configureStore({
  reducer: {
    dateTime: dateTimeReducer,
    commits: commitsReducer
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
