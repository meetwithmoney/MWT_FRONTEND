import { getSession } from "../config/localStorage";

export function isLogin() {
  const _token = getSession();
  return _token !== undefined && _token !== "" && _token !== null ? true : false;
}
