import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authPostApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
import { showError } from "../../helpers/messageHelper";
import { ResponseDataObject } from "../../types/commonTypes";

type ForgotPasswordState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: ResponseDataObject;
};

const initialState: ForgotPasswordState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
};

type ForgotPasswordValues = {
  email: string;
};

export const forgotPasswordData = createAsyncThunk(
  "/forgotPasswordData",
  async (values: ForgotPasswordValues) => {
    try {
      const payload = await authPostApi(apiEndPoints.FORGOT_PASSWORD_PATH, values);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message);
      // return e;
    }
  }
);
export const forgotPasswordSlice = createSlice({
  name: "forgotPasswordData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.data;
      })
      .addCase(forgotPasswordData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const forgotPasswordReducer = forgotPasswordSlice.reducer;
