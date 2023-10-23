import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DateTimeState {
    selectedDate: Date;
    activeDate: Date;
}

const initialState: DateTimeState = {
    selectedDate: new Date(),
    activeDate: new Date()
};

export const dateTimeSlice = createSlice({
    name: "dateTime",
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<Date>) => {
            state.selectedDate = action.payload;
        },
        setActiveDate: (state, action: PayloadAction<Date>) => {
            state.activeDate = action.payload;
        }
    }
});

export const { setSelectedDate, setActiveDate } = dateTimeSlice.actions;

export const selectActiveDate = (state: RootState) => state.dateTime.activeDate;
export const selectSelectedDate = (state: RootState) => state.dateTime.selectedDate;

export default dateTimeSlice.reducer;