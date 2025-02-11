import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../helpers/localSession";

export const UnauthenticatedRoute = () => {

  return (
    <>
      {isLogin() ? <Navigate to="/chat" /> : <Outlet />}
    </>
  );
};
