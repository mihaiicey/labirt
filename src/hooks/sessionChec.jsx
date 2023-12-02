import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/Auth";

export function sessionCheck(urlRedir) {
  const {session} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (session && session != null) {
      navigate(urlRedir || '/');
    }
  }, [session, navigate, urlRedir]);
}