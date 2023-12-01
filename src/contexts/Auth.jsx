import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

/**
 * Crează un context pentru autentificare.
 * Contextul este folosit pentru a partaja informații despre starea de autentificare
 * între diferite componente ale aplicației.
 */


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}
