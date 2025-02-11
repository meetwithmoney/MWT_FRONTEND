import { config } from "./config";

/**
 * This function is used to create local session
 * @param string _token
 */
export function setSession(_token: string) {
  localStorage.setItem(config.localStorageAuthTokenKey, _token);
}

/**
 * This function is used to get local session object
 * @returns object
 */
export function getSession() {
  return localStorage.getItem(config.localStorageAuthTokenKey);
}

/**
 * This function is used to clear local storage key
 */
export function clearSession() {
  localStorage.removeItem(config.localStorageAuthTokenKey);
  localStorage.removeItem("user");
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalStorageItem(key: string) {
  return localStorage.getItem(key);
}
