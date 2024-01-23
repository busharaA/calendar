import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHolidays } from "../../services/holidays";
import { IHolidays } from "../../helpers/interfaces/IHolidays";
import { RootState } from "../../app/store";

export const fetchHolidays = createAsyncThunk(
    "holidays/fetchHolidays",
    async () => getHolidays()
);

export interface HolidaysState {
    holiday: IHolidays[];
    holidayDetails: IHolidays;
    status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: HolidaysState = {
    holiday: [],
    holidayDetails: {
        name: "",
        date: "",
    },
    status: "idle"
}

export const holidaysSlice = createSlice({
    name: "holidays",
    initialState,
    reducers: {
        setHolidayDetails: (state, action: PayloadAction<IHolidays>) => {
            state.holidayDetails.name = action.payload.name;
            state.holidayDetails.date = action.payload.date;
        },
        clearHolidayDetails: (state) => {
            state.holidayDetails.name = "";
            state.holidayDetails.date = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchHolidays.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchHolidays.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (state.holiday.length === 0) {
                    state.holiday = state.holiday.concat(action.payload);
                }
            })
            .addCase(fetchHolidays.rejected, (state) => {
                state.status = "failed";
            })
    },
})

export const { setHolidayDetails, clearHolidayDetails } = holidaysSlice.actions;

export const selectHoliday = (state: RootState) => state.holidays.holiday;
export const selectHolidayDetails = (state: RootState) => state.holidays.holidayDetails;

export default holidaysSlice.reducer;