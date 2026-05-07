import { createContext, useState, useEffect, useCallback } from 'react';
import { fetchUserMe, checkAuth, logout as authLogout, getCurrentUser, setCurrentUser, clearCurrentUser } from '../api/auth';

const AuthContext = createContext(null);

export { AuthContext };
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const hasToken = checkAuth();
    
    if (!hasToken) {
      clearCurrentUser();
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const storedUser = getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }

      const response = await fetchUserMe();
      if (response.data) {
        setUser(response.data);
        setCurrentUser(response.data);
        setIsAuthenticated(true);
      }
    } catch {
      const storedUser = getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      } else {
        clearCurrentUser();
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = (userData) => {
    setUser(userData);
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authLogout();
    clearCurrentUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, refetch: loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};