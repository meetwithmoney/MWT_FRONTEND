import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginDataReducer } from "../features/auth/loginSlice";
import { signUpDataReducer } from "../features/auth/signUpSlice";
import { forgotPasswordReducer } from "../features/auth/forgotPasswordSlice";
import { resetPasswordReducer } from "../features/auth/resetPasswordSlice";
import { verifyResetPasswordTokenReducer } from "../features/auth/verifyResetPasswordToken";
import { contactUsDataReducer } from "../features/contactUs/contactUsSlice";
import { fetchUserListDataReducer } from "../features/chat/fetchUserListSlice";
import { fetchUserProfileDataReducer } from "../features/user/userProfileSlice";
import { fetchUserMessagesThreadDataReducer } from "../features/chat/fetchUserMessagesThreadSlice";
import { fetchPeopleListDataReducer } from "../features/people/fethcPeopleListSlice";
import { fetchCareerListDataReducer } from "../features/career/fetchCareerListSlice";
import { updateMessageDataReducer } from "../features/chat/updateMessageDataSlice";
import { fetchPaymentPhotoDataReducer } from "../features/auth/paymenetPhotoSlice";

const store = configureStore({
  reducer: combineReducers({
    // auth module reducers
    loginDataReducer: loginDataReducer,
    signUpDataReducer: signUpDataReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    resetPasswordReducer: resetPasswordReducer,
    verifyResetPasswordTokenReducer: verifyResetPasswordTokenReducer,
    fetchPaymentPhotoDataReducer: fetchPaymentPhotoDataReducer,

    contactUsDataReducer: contactUsDataReducer,

    fetchUserListDataReducer: fetchUserListDataReducer,
    fetchUserProfileDataReducer: fetchUserProfileDataReducer,

    fetchUserMessagesThreadDataReducer: fetchUserMessagesThreadDataReducer,

    fetchPeopleListDataReducer: fetchPeopleListDataReducer,

    fetchCareerListDataReducer: fetchCareerListDataReducer,

    updateMessageDataReducer: updateMessageDataReducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;