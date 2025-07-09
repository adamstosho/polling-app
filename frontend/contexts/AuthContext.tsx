'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, setTokens, clearTokens, getToken } from '@/lib/api';
import SocketClient from '@/lib/socket';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }

    // Cleanup socket connection on unmount
    return () => {
      SocketClient.getInstance().disconnect();
    };
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/users/me');
      setUser(response.data);
      
      // Connect to socket when user is authenticated
      SocketClient.getInstance().connect();
    } catch (error) {
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/signin', { email, password });
    const { token, refreshToken, user: userData } = response.data;
    
    setTokens(token, refreshToken);
    setUser(userData);
    
    // Connect to socket after login
    SocketClient.getInstance().connect();
  };

  const signup = async (name: string, email: string, password: string) => {
    await api.post('/auth/signup', { name, email, password });
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    
    // Disconnect socket on logout
    SocketClient.getInstance().disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};