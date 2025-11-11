import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isMember?: boolean;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  unreadMessagesCount: number;
  login: (userData: User) => void;
  register: (userData: User) => void;
  logout: () => void;
  setUnreadMessagesCount: (count: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(3);

  const login = useCallback((userData: User) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  }, []);

  const register = useCallback((userData: User) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        unreadMessagesCount,
        login,
        register,
        logout,
        setUnreadMessagesCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

