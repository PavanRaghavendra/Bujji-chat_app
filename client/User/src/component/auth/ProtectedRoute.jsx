import React from "react"; 
import { Navigate,Outlet } from "react-router-dom";
const ProtectedRoute = ({ children, user, redirect }) => {
  if (redirect === "/" && user) {
    return <Navigate to="/" replace />;
  }
  if (redirect === "/login" && !user) {
    return <Navigate to="/login" replace />;
  }
  if(redirect==='/admin'&& !user)
  {
    return <Navigate to="/admin" replace/>
  }
  if(redirect==='/admin/dashboard'&&user)
    return <Navigate to="/admin/dashboard" replace/>
  return children ? children : <Outlet />;
};
export default ProtectedRoute;