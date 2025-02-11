import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

export type PeopleListResponseData = {
  people: {
    collage: string;
    gender: string;
    age: number;
    first_name: string;
    last_name: string;
    is_active: boolean;
    amount: string;
  }[];
  total_count: number;
};

type FetchPeopleListState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: PeopleListResponseData;
};

const initialState: FetchPeopleListState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {
    people: [],
    total_count: 0,
  },
};

type queryParams = {
  searchText: string;
  page: number;
  limit: number;
  age: string;
  gender: string;
  area: string;
  collage: string;
};

export const fetchPeopleListData = createAsyncThunk(
  "/fetchPeopleList",
  async ({ searchText, page = 1, limit = 10, age, gender, area, collage }: queryParams) => {
    const payload = await getApi(`${apiEndPoints.FETCH_PEOPLE_LIST_PATH}?page=${page}&limit=${limit}${searchText && `&search=${searchText}`}${age && `&age=${age}`}${gender && `&gender=${gender}`}${area && `&area=${area}`}${collage && `&collage=${collage}`}`);
    return payload;
  }
);

export const fetchPeopleListDataSlice = createSlice({
  name: "fetchPeopleListData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleListData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPeopleListData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.responseData;
      })
      .addCase(fetchPeopleListData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const fetchPeopleListDataReducer = fetchPeopleListDataSlice.reducer;
