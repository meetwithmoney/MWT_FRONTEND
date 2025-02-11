import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

export type PaymentPhotoResponseData = {
  _id: string;
  qr_code_image: string;
  createdAt: string;
  updatedAt: string;
};

type FetchPaymentPhotoState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: PaymentPhotoResponseData;
};

const initialState: FetchPaymentPhotoState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {
    _id: "",
    qr_code_image: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const fetchPaymentPhotoData = createAsyncThunk(
  "/fetchPaymentPhoto",
  async () => {
    const payload = await getApi(`${apiEndPoints.FETCH_PAYMENT_PHOTO_PATH}`);
    return payload;
  }
);

export const fetchPaymentPhotoDataSlice = createSlice({
  name: "fetchPaymentPhotoData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentPhotoData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPaymentPhotoData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.responseData;
      })
      .addCase(fetchPaymentPhotoData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const fetchPaymentPhotoDataReducer = fetchPaymentPhotoDataSlice.reducer;
