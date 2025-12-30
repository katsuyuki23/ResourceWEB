'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { users, type User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('panti_admin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('panti_admin_user', JSON.stringify(userWithoutPassword));
      return { success: true, message: 'Login berhasil!' };
    }

    return { success: false, message: 'Email atau password tidak valid' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('panti_admin_user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const rolePermissions: Record<string, string[]> = {
      admin: ['create', 'read', 'update', 'delete', 'manage_users', 'export', 'approve'],
      operator: ['create', 'read', 'update', 'delete', 'export'],
      viewer: ['read']
    };

    return rolePermissions[user.role]?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>
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
