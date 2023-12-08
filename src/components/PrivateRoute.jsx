import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Loading from "../features/ui/Loading";
import ErrorPage from "../features/ui/ErrorPage";
export function PrivateRoute({ children, allowedRoles }) {
  const { user, userRole, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <ErrorPage error={403} shortMsg={'Not Allowed'}/>;
  }

  return children;
}
//http://localhost:5173/admin/restaurants
