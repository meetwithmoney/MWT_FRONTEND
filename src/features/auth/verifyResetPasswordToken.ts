import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
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

export const verifyResetPasswordTokenData = createAsyncThunk(
  "/verifyResetPasswordTokenData",
  async (token: string) => {
    try {
      const payload = await getApi(`${apiEndPoints.RESET_PASSWORD_PATH}/${token}`);
      return payload;
    } catch (e: any) {
      // showError(e.response.data.message);
      return e.response;
    }
  }
);
export const verifyResetPasswordTokenSlice = createSlice({
  name: "verifyResetPasswordTokenData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyResetPasswordTokenData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyResetPasswordTokenData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.data;
      })
      .addCase(verifyResetPasswordTokenData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const verifyResetPasswordTokenReducer = verifyResetPasswordTokenSlice.reducer;
