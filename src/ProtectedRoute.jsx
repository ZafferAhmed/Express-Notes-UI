import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userData");

  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
