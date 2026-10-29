import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../api/client';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUser = (data: any): User | null => {
  if (!data) return null;
  return {
    id: data.id || data._id || '',
    name: data.name || 'User',
    email: data.email || '',
    profilePicture: data.profilePicture || data.profile_picture || undefined,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('prompt_studio_user');
    return saved ? normalizeUser(JSON.parse(saved)) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch('/api/auth/me', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (res.ok) {
          const rawData = await res.json();
          const normalized = normalizeUser(rawData);
          setUser(normalized);
          if (normalized) {
            localStorage.setItem('prompt_studio_user', JSON.stringify(normalized));
          }
        } else {
          setUser(null);
          localStorage.removeItem('prompt_studio_user');
        }
      } catch (err) {
        console.error('Failed to fetch auth status', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginWithGoogle = async (idToken: string) => {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_token: idToken })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Google sign-in failed on server');
    }

    const data = await res.json();
    const normalized = normalizeUser(data.user);
    setUser(normalized);
    if (normalized) {
      localStorage.setItem('prompt_studio_user', JSON.stringify(normalized));
    }
  };

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      setUser(null);
      localStorage.removeItem('prompt_studio_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
