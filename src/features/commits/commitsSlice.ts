import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { githubCommits } from "../../services/githubCommits";
import { ICommit } from "../../helpers/interfaces/ICommit";
import { RootState } from "../../app/store";

export const fetchCommits = createAsyncThunk(
    "commits/fetchCommits",
    async () => githubCommits()
);

export interface CommitsState {
    commit: ICommit[];
    commitDetails: ICommit;
    status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: CommitsState = {
    commit: [],
    commitDetails: {
        name: "",
        date: "",
        message: "",
    },
    status: "idle"
}

export const commitsSlice = createSlice({
    name: "commits",
    initialState,
    reducers: {
        setCommitDetails: (state, action: PayloadAction<ICommit>) => {
            state.commitDetails.name = action.payload.name;
            state.commitDetails.date = action.payload.date;
            state.commitDetails.message = action.payload.message;
        },
        clearCommitDetails: (state) => {
            state.commitDetails.name = "";
            state.commitDetails.date = "";
            state.commitDetails.message = "";
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCommits.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchCommits.fulfilled, (state, action) => {
                state.status = "succeeded";
                if (state.commit.length === 0) {
                    state.commit = state.commit.concat(action.payload);
                }
            })
            .addCase(fetchCommits.rejected, (state) => {
                state.status = "failed";
            })
    },
})

export const { setCommitDetails, clearCommitDetails } = commitsSlice.actions;

export const selectCommit = (state: RootState) => state.commits.commit;
export const selectCommitDetails = (state: RootState) => state.commits.commitDetails;

export default commitsSlice.reducer;