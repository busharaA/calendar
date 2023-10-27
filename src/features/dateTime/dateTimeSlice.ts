import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DateTimeState {
    activeDate: number;
    activeDateUrl: string;
}

const initialState: DateTimeState = {
    activeDate: Date.parse(new Date().toDateString()),
    activeDateUrl: "",
};

export const dateTimeSlice = createSlice({
    name: "dateTime",
    initialState,
    reducers: {
        setActiveDate: (state, action: PayloadAction<number>) => {
            state.activeDate = action.payload;
        },
        setActiveDateUrl: (state, action: PayloadAction<string>) => {
            state.activeDateUrl = action.payload;
        }
    }
});

export const { setActiveDate, setActiveDateUrl } = dateTimeSlice.actions;

export const selectActiveDate = (state: RootState) => state.dateTime.activeDate;
export const selectActiveDateUrl = (state: RootState) => state.dateTime.activeDateUrl;

export default dateTimeSlice.reducer;