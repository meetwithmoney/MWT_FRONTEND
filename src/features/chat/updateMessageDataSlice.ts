import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patchApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

type UpdateMessageDataState = {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    responseCode: number | null;
    responseData: object;
};

const initialState: UpdateMessageDataState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    responseCode: 0,
    responseData: {},
};

export const updateMessageData = createAsyncThunk(
    "/updateMessageData",
    async ({ receiverId = '' }: { receiverId?: string }) => {
        const payload = await patchApi(apiEndPoints.UPDATE_MESSAGE_PATH, { receiverId });
        return payload;
    }
);
export const updateMessageDataSlice = createSlice({
    name: "updateMessageData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateMessageData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMessageData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.responseCode = payload?.status;
                state.responseData = payload.data.data;
            })
            .addCase(updateMessageData.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    },
});

export const updateMessageDataReducer = updateMessageDataSlice.reducer;
