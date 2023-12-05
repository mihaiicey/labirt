import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ?  children : <Navigate to="/login" />
}
