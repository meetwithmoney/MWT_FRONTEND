import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

export type CareerListResponseData = {
  total_earnings: number,
  people_count: number,
  profile_image: string,
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  mobile_number: string,
  dob: string,
  age: number,
  profile_picture: string,
  password: string,
  collage_name: string,
  area: string,
  block_by_admin: boolean,
  block_at: string | null,
  is_active: boolean,
  take_subscription: boolean,
  deletedAt: string | null,
  createdAt: string,
  updatedAt: string,
  socket_id: string,
  last_seen: string,
  approved_by_admin: boolean,
  gender: string,
  referral_code: string
};

type FetchCareerListState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: CareerListResponseData[];
};

const initialState: FetchCareerListState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: []
};

type queryParams = {
  searchText: string;
  page: number;
  limit: number;
};

export const fetchCareerListData = createAsyncThunk(
  "/fetchCareerList",
  async ({ searchText, page = 1, limit = 10 }: queryParams) => {
    const payload = await getApi(`${apiEndPoints.CAREER_PATH}?page=${page}&limit=${limit}${searchText && `&search=${searchText}`}`);
    return payload;
  }
);

export const fetchCareerListDataSlice = createSlice({
  name: "fetchCareerListData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerListData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCareerListData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.responseData;
      })
      .addCase(fetchCareerListData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const fetchCareerListDataReducer = fetchCareerListDataSlice.reducer;
