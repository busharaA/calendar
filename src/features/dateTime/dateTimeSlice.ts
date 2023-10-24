import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DateTimeState {
    selectedDate: number;
    activeDate: number;
}

const initialState: DateTimeState = {
    selectedDate: Date.parse(new Date().toDateString()),
    activeDate: Date.parse(new Date().toDateString()),
};

export const dateTimeSlice = createSlice({
    name: "dateTime",
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<number>) => {
            state.selectedDate = action.payload;
        },
        setActiveDate: (state, action: PayloadAction<number>) => {
            state.activeDate = action.payload;
        }
    }
});

export const { setSelectedDate, setActiveDate } = dateTimeSlice.actions;

export const selectActiveDate = (state: RootState) => state.dateTime.activeDate;
export const selectSelectedDate = (state: RootState) => state.dateTime.selectedDate;

export default dateTimeSlice.reducer;