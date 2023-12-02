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
 
   const signOut = async () => {
     const { error } = await supabase.auth.signOut();
     if (error) {
       console.error('Eroare la deconectare:', error);
     }
     setSession(null);
   };
 
   const value = {
     session,
     signOut,
   };
 
   return (
     <AuthContext.Provider value={value}>
       {children}
     </AuthContext.Provider>
   );
 }