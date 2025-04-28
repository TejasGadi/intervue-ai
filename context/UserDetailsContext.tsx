import React from 'react';

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface UserDetailsContextValue {
  user: UserDetails | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetails | null>>;
}

export const UserDetailsContext = React.createContext<UserDetailsContextValue | undefined>(undefined);
