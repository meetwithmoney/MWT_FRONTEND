import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authPostApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
import { showError } from "../../helpers/messageHelper";
import { ResponseDataObject } from "../../types/commonTypes";

type ResetPasswordState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: ResponseDataObject;
};

const initialState: ResetPasswordState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
};

type ResetPasswordValues = {
  token: string | undefined;
  password: string;
};

export const resetPasswordData = createAsyncThunk(
  "/resetPasswordData",
  async (values: ResetPasswordValues) => {
    try {
      const payload = await authPostApi(apiEndPoints.RESET_PASSWORD_PATH, values);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message);
      // return e;
    }
  }
);
export const resetPasswordSlice = createSlice({
  name: "resetPasswordData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.data;
      })
      .addCase(resetPasswordData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const resetPasswordReducer = resetPasswordSlice.reducer;
