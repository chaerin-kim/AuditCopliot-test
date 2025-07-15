'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  token: string;
  clientId: string;
}

interface AuthContextType {
  auth: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    email: '',
    token: '',
    clientId: 'your_client_id' // 실제 구현시 환경변수에서 가져와야 합니다
  });

  const login = async (email: string, password: string) => {
    try {
      // 실제 구현시 백엔드 API 호출이 필요합니다
      // 여기서는 테스트를 위해 간단히 구현
      if (email && password) {
        setAuth({
          isLoggedIn: true,
          email,
          token: 'sample_token_' + Date.now(), // 실제 구현시 서버에서 받아야 합니다
          clientId: 'your_client_id'
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      email: '',
      token: '',
      clientId: 'your_client_id'
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
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