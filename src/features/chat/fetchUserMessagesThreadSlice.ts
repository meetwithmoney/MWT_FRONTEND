import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

export type UserMessagesThreadResponseData = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  seen_at: string | null;
  timestamp: string;
};

type FetchUserMessagesThreadState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: UserMessagesThreadResponseData[];
};

const initialState: FetchUserMessagesThreadState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: [],
};

export const fetchUserMessagesThreadData = createAsyncThunk(
  "/fetchUserList",
  async (friendId: string) => {
    const payload = await getApi(`${apiEndPoints.GET_MESSAGE_THREAD_PATH}?friendId=${friendId}`);
    return payload;
  }
);

export const fetchUserMessagesThreadDataSlice = createSlice({
  name: "fetchUserMessagesThreadData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMessagesThreadData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserMessagesThreadData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.responseData;
      })
      .addCase(fetchUserMessagesThreadData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const fetchUserMessagesThreadDataReducer = fetchUserMessagesThreadDataSlice.reducer;
