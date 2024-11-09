"use client";
import React, { createContext, useState, useEffect } from 'react';

interface UserDetails {
  email: string;
}

interface UserContextType {
  user: UserDetails;
  setuser: (user: UserDetails) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setuser] = useState<UserDetails>({
    email: '',
  });

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setuser(JSON.parse(storedUser));
    }
  }, []);

  // Save user data to local storage whenever user state changes
  useEffect(() => {
    if (user.email) { // Save only if there's meaningful data
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};
