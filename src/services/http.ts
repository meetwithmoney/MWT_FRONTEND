import axios from "axios";
// import { refreshTokenAPI } from "./api";
import { EXPIRED, UNAUTHORIZED } from "../config/httpStatusCodes";
import { config } from "../config/config";
import { clearSession } from "../config/localStorage";

const instance = axios.create({
  baseURL: config.apiBaseUrl,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response.status === UNAUTHORIZED || response.status === EXPIRED) {
      // const isRefreshTokenFailed = response.request.responseURL.split("/").includes("refresh");
      // if (isRefreshTokenFailed) {
      //   clearSession();
      //   window.location.href = import.meta.env.VITE_APP_BASE_NAME;
      // } else if (localStorage.getItem(config.localStorageRefreshTokenKey)) {
      //   const data = await refreshTokenAPI();
      //   if (data.status === UNAUTHORIZED) {
      //     clearSession();
      //     window.location.href = import.meta.env.VITE_APP_BASE_NAME;
      //   } else {
      //     data?.data?.data?.access_token && setLocalStorageItem(config.localStorageAuthTokenKey, data?.data?.data?.access_token);
      //     data?.data?.data?.refresh_token && setLocalStorageItem(config.localStorageRefreshTokenKey, data?.data?.data?.refresh_token);
      //     window.location.reload();
      //   }
      // } else {
      //   clearSession();
      //   window.location.href = import.meta.env.VITE_APP_BASE_NAME;
      // }
      clearSession();
      window.location.href = import.meta.env.VITE_APP_BASE_NAME;
    }
    throw error;
  }
);

export default instance;
