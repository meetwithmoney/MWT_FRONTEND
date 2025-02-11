import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

type ResponseData = {
  data?: {
    responseStatus?: boolean;
    responseCode?: number;
    responseMessage?: string;
  }
};

type ContactUsDataState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: ResponseData;
  token: string;
};

const initialState: ContactUsDataState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  token: "",
};

type ContactUsValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message?: string;
};

export const contactUsData = createAsyncThunk(
  "/contactUsData",
  async (values: ContactUsValues) => {
    const payload = await postApi(apiEndPoints.CONTACT_US_PATH, values);
    return payload;
  }
);
export const ContactUsDataSlice = createSlice({
  name: "contactUsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactUsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contactUsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.data;
      })
      .addCase(contactUsData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const contactUsDataReducer = ContactUsDataSlice.reducer;
