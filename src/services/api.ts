import { config } from "../config/config";
import ApiInstance from "./http";
import { getAuthHeader, getHeader } from "../helpers/utils";

interface AuthHeader {
  headers: {
    Accept: string;
    "Accept-Language": string;
  };
}

interface Header {
  headers: {
    Accept: string;
    "Accept-Language": string;
    Authorization: string | null;
  };
}

export const getApi = async (url: string) => {
  const headers: Header = getHeader();
  const data: any = await ApiInstance.get(`${url}`, headers);
  return data;
};

export const postApi = (url: string, apiData: any) => {
  const headers: Header = getHeader();
  return ApiInstance.post(`${url}`, apiData, headers);
};

export const authPostApi = async (url: string, apiData: any) => {
  const headers: AuthHeader = getAuthHeader();
  try {
    const data: any = await ApiInstance.post(`${url}`, apiData, headers);
    return data;
  } catch (error: any) {
    return error.response;
  }
  // return ApiInstance.post(`${config.apiBaseUrl}${url}`, apiData,headers)
};
export const patchApi = (url: string, apiData?: any) => {
  const headers: Header = getHeader();
  return ApiInstance.patch(`${url}`, apiData, headers);
};

export const putApi = (url: string, apiData: any) => {
  const headers: Header = getHeader();
  return ApiInstance.put(`${url}`, apiData, headers);
};

export const deleteApi = (url: string) => {
  const headers: Header = getHeader();
  return ApiInstance.delete(`${config.apiBaseUrl}${url}`, headers);
};
