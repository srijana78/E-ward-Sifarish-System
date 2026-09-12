import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // ==========================================
  // GET SAVED USER
  // ==========================================

  const [user, setUser] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem("sifarish_user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;

    } catch (error) {
      console.error(
        "Failed to parse saved user:",
        error
      );

      localStorage.removeItem("sifarish_user");

      return null;
    }
  });

  // ==========================================
  // GET SAVED TOKEN
  // ==========================================

  const [token, setToken] = useState(() => {
    return (
      localStorage.getItem("sifarish_token") || null
    );
  });

  // ==========================================
  // LOGIN
  // ==========================================

  const login = (userData, authToken) => {

    console.log("Saving user:", userData);
    console.log("User role:", userData?.role);

    setUser(userData);
    setToken(authToken);

    localStorage.setItem(
      "sifarish_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "sifarish_token",
      authToken
    );
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem("sifarish_user");

    localStorage.removeItem("sifarish_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,

        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}