import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authPostApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";
import { showError } from "../../helpers/messageHelper";

type UserData = {
  uuid: string;
  full_name: string;
  email: string;
  isd_code: string;
  mobile_number: string;
  mobile_verified_at: string;
  is_profile_completed: boolean;
  screen_completed: number;
  type: number;
  current_type: number;
};

type ResponseData = {
  user?: UserData;
  is_already_logged_in?: boolean;
  access_token?: string;
  refresh_token?: string;
};

type SignUpDataState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: ResponseData;
  token: string;
};

const initialState: SignUpDataState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  token: "",
};

export const signUpData = createAsyncThunk(
  "/signUpData",
  async (values: FormData) => {
    try {
      const payload = await authPostApi(apiEndPoints.SIGN_UP_PATH, values);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message);
      // return e;
    }
  }
);
export const signUpDataSlice = createSlice({
  name: "signUpData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.data;
      })
      .addCase(signUpData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const signUpDataReducer = signUpDataSlice.reducer;
