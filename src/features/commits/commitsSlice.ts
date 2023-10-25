import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { githubCommits } from "../../services/githubCommits";
import { ICommit } from "../../helpers/interfaces/ICommit";
import { RootState } from "../../app/store";

export const fetchCommits = createAsyncThunk(
    "commits/fetchCommits",
    async () => githubCommits()
);

export interface CommitsState {
    commit: ICommit[];
    status: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: CommitsState = {
    commit: [],
    status: "idle"
}

export const commitsSlice = createSlice({
    name: "commits",
    initialState,
    reducers: {},
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

export const selectCommit = (state: RootState) => state.commits.commit;

export default commitsSlice.reducer;