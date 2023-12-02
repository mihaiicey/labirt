import { useEffect } from "react";
import { useAuth } from '../../contexts/Auth'
import Login from '../../features/Auth/Login'
import RegisterClient from "../../features/Auth/Reg";
import { useNavigate, useLocation } from "react-router-dom";


export default function LoginUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useAuth()
  const path = location.pathname;

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session]);

  if (path.includes('/login')) {
    return <Login/>
  } else if (path.includes('/register')) {
    return <RegisterClient/>
  }


}