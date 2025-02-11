import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authPostApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

type ResponseData = {
  responseStatus?: boolean,
  responseCode?: number,
  responseMessage?: string,
  responseData?: {
      authorization_token: string,
      user_id: string,
      redirect_url: string
  }
};

type LoginDataState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: ResponseData;
  token: string;
};

const initialState: LoginDataState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  token: "",
};

type LoginDataValues = {
  email: string;
  password: string;
};

export const loginData = createAsyncThunk(
  "/loginData",
  async (values: LoginDataValues) => {
    const payload = await authPostApi(apiEndPoints.LOGIN_PATH, values);
    return payload;
  }
);
export const loginDataSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.data;
      })
      .addCase(loginData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const loginDataReducer = loginDataSlice.reducer;
