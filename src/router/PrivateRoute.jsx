import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  console.log("token:",token);
  if (!token) return <Navigate to="/sign-in" />;

  return <Outlet />;
};

export default PrivateRoute;
