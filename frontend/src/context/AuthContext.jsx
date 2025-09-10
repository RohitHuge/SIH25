import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../components/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [authError, setAuthError] = useState(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    // Check if auth service is properly initialized
    try {
      checkAuthStatus();
    } catch (error) {
      console.error('Auth service initialization error:', error);
      setAuthError('Authentication service is not properly configured. Please check your environment variables.');
      setIsLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        setSession({ 
          $id: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name,
          createdAt: currentUser.$createdAt
        });
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setSession(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Create session
      const newSession = await authService.login(credentials);
      if (!newSession) {
        throw new Error('Failed to create session');
      }

      // Get user details
      const userData = await authService.getCurrentUser();
      if (!userData) {
        throw new Error('Failed to get user data');
      }
      console.log("userData", userData);

      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      setSession({
        $id: userData.$id,
        email: userData.email,
        name: userData.name,
        createdAt: userData.$createdAt
      });

      return { success: true, user: userData, session: newSession };
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      setIsAuthenticated(false);
      setSession(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      setSession(null);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local state
      setUser(null);
      setIsAuthenticated(false);
      setSession(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      const newUser = await authService.createAccount(userData);
      if (!newUser) {
        throw new Error('Failed to create account');
      }

      // After successful registration, user should be automatically logged in
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        setSession({
          $id: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name,
          createdAt: currentUser.$createdAt
        });
      }

      return { success: true, user: currentUser };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        setSession({
          $id: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name,
          createdAt: currentUser.$createdAt
        });
        return currentUser;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setSession(null);
        return null;
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setIsAuthenticated(false);
      setSession(null);
      return null;
    }
  };

  const value = {
    // State
    user,
    isAuthenticated,
    isLoading,
    session,
    authError,
    
    // Actions
    login,
    logout,
    register,
    refreshUser,
    checkAuthStatus,
    
    // Computed values
    userEmail: user?.email || null,
    userName: user?.name || null,
    userId: user?.$id || null,
    isLoggedIn: isAuthenticated && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
