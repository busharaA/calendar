import { createSlice } from "@reduxjs/toolkit";
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
    reducers: {}
});

export const selectActiveDate = (state: RootState) => state.dateTime.activeDate;

export default dateTimeSlice.reducer;