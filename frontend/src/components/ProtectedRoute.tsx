import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utils/customCookie";

const ProtectedRoute = () => {
  const token = getCookie("token");
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
