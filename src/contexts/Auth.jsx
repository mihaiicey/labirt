import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '@/supabase';

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
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchUserDetails = async (userId) => {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
      if (error) {
        console.error('Eroare la preluarea detaliilor utilizatorului:', error);
      } else {
        setUserRole(data[0]?.role);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
      if (session?.user) {
        fetchUserDetails(session.user.id);
        setUser(session.user);
      }
      setIsLoading(false); 
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      if (session?.user) {
        fetchUserDetails(session.user.id);
        setUser(session.user);
      }
      setIsLoading(false); 
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Eroare la deconectare:', error);
    }
    setSession(null);
    setUserRole(null);
  };

  const value = {
    session,
    signOut,
    user,
    userRole,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}