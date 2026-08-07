import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('aegis_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('aegis_token') || null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('aegis:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('aegis:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('aegis_user', JSON.stringify(data.user));
      localStorage.setItem('aegis_token', data.token);
      return { success: true, user: data.user };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Authentication failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'employee') => {
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password, role });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('aegis_user', JSON.stringify(data.user));
      localStorage.setItem('aegis_token', data.token);
      return { success: true, user: data.user };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message || 'Registration failed'
      };
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayName = (newName) => {
    if (!newName || !newName.trim()) return;
    const updatedUser = { ...user, name: newName.trim(), hasCustomName: true };
    setUser(updatedUser);
    localStorage.setItem('aegis_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('aegis_user');
    localStorage.removeItem('aegis_token');
  };

  const value = {
    user,
    token,
    role: user?.role || 'employee',
    isAuthenticated: !!token && !!user,
    loading,
    login,
    register,
    logout,
    updateDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
