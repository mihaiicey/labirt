import React from "react";
import { Navigate} from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Loading from "../features/ui/Loading";
export  function PrivateRoute({children}) {
  const {user, isLoading} =  useAuth()
  if(isLoading){
    return <Loading/>
  }
  return user ?  children : <Navigate to="/login" />
}
