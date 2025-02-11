import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getApi, patchApi, postApi } from "../../services/api";
import { apiEndPoints } from "../../config/path";

export type UserProfileResponseData = {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    mobile_number?: string;
    dob?: string;
    age?: number;
    profile_picture?: string;
    password?: string;
    collage_name?: string | null;
    area?: string;
    block_by_admin?: boolean;
    block_at?: string | null;
    is_active?: boolean;
    take_subscription?: boolean;
    deletedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

type FetchUserProfileState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: UserProfileResponseData;
};

const initialState: FetchUserProfileState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
};

export const fetchUserProfileData = createAsyncThunk(
  "/fetchUserProfile",
  async () => {
    const payload = await getApi(`${apiEndPoints.FETCH_USER_PROFILE_PATH}`);
    return payload;
  }
);

export const userPicture = createAsyncThunk(
  "/userPicture",
  async (values: FormData) => {
    const payload = await patchApi(`${apiEndPoints.UPDATE_USER_PROFILE}`, values);
    return payload;
  }
)

export const fetchUserProfileDataSlice = createSlice({
  name: "fetchUserProfileData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfileData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.responseData.profileData;
      })
      .addCase(fetchUserProfileData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(userPicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userPicture.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload?.status;
        state.responseData = payload.data.responseData.profileData;
      })
      .addCase(userPicture.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const fetchUserProfileDataReducer = fetchUserProfileDataSlice.reducer;
