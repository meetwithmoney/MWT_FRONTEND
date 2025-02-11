import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

export type UserListResponseData = {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  last_seen: string;
};

type FetchUserListState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: UserListResponseData[];
};

const initialState: FetchUserListState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: [],
};

export const fetchUserListData = createAsyncThunk(
  "/fetchUserList",
  async (searchText: string) => {
    const payload = await getApi(`${apiEndPoints.FETCH_USER_LIST_PATH}${searchText && `?search=${searchText}`}`);
    return payload;
  }
);

export const fetchUserListDataSlice = createSlice({
  name: "fetchUserListData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserListData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserListData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.responseData;
      })
      .addCase(fetchUserListData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const fetchUserListDataReducer = fetchUserListDataSlice.reducer;
