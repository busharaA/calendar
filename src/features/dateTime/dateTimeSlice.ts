import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DateTimeState {
    activeDate: number;
}

const initialState: DateTimeState = {
    activeDate: Date.parse(new Date().toDateString()),
};

export const dateTimeSlice = createSlice({
    name: "dateTime",
    initialState,
    reducers: {
        setActiveDate: (state, action: PayloadAction<number>) => {
            state.activeDate = action.payload;
        }
    }
});

export const { setActiveDate } = dateTimeSlice.actions;

export const selectActiveDate = (state: RootState) => state.dateTime.activeDate;

export default dateTimeSlice.reducer;