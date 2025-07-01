import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const isAuthenticated = !!localStorage.getItem("auth");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
