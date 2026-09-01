import React, { createContext, useState, useEffect, useContext } from 'react';

// Key constants for localStorage
const USER_KEY = 'eward_user_data';
const TOKEN_KEY = 'eward_auth_token';

// 1. Create the Context
export const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
  login: (userData, authToken) => {},
  logout: () => {},
  hasRole: (allowedRoles) => false,
});

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session from localStorage on initial load/refresh
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(USER_KEY);
        const storedToken = localStorage.getItem(TOKEN_KEY);

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to restore authentication session:', error);
        // Clean up corrupted storage
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Log in user and persist state
   * @param {Object} userData - User profile object { name, email, role, etc. }
   * @param {string} authToken - JWT token from backend
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    try {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      localStorage.setItem(TOKEN_KEY, authToken);
    } catch (error) {
      console.error('Failed to save session to localStorage:', error);
    }
  };

  /**
   * Log out user and clear persisted state
   */
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  /**
   * Helper function to check if logged-in user matches required roles
   * @param {Array<string>} allowedRoles - e.g., ['Secretary', 'Chairperson']
   * @returns {boolean}
   */
  const hasRole = (allowedRoles = []) => {
    if (!user || !user.role) return false;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until initial auth check finishes */}
      {!loading ? children : (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
            <span>Initializing session...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook for fast & clean context consumption in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};