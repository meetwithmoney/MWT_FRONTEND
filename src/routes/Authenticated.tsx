import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../helpers/localSession";

export function AuthenticatedRoute() {

  return (
    <>
      {isLogin() ? <Outlet /> : <Navigate to="/" />}
    </>
  );
}
