'use client';

import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { UserDetailsContext, UserDetails, UserDetailsContextValue } from '@/context/UserDetailsContext';
import { supabase } from '@/services/supbaseClient';

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);

  // Helper: fetch or create a user record
  const createOrFetchUser = async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      console.error('Supabase getUser error', authError);
      return;
    }
    const usr = authData.user;
    const email = usr.email!;
    // Try to find existing user
    const { data: existingUsers, error: selectError } = await supabase
      .from<UserDetails>('Users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    if (selectError) {
      console.error('Error querying Users table', selectError);
      return;
    }

    if (!existingUsers) {
      // Insert new user
      const { data: inserted, error: insertError } = await supabase
        .from<UserDetails>('Users')
        .insert([
          {
            name: usr.user_metadata.name,
            email,
            picture: usr.user_metadata.picture,
          },
        ])
        .single();
      if (insertError) {
        console.error('Error inserting user', insertError);
        return;
      }
      setUser(inserted);
    } else {
      setUser(existingUsers);
    }
  };

  useEffect(() => {
    createOrFetchUser();
  }, []); 

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default Provider;

// Custom hook for consuming the context
export const useUser = (): UserDetailsContextValue => {
  const ctx = useContext(UserDetailsContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserDetailsContext provider');
  }
  return ctx;
};
