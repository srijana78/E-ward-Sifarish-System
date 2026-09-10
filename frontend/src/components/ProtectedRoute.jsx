import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();

  // User is not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Check permission
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    // Redirect according to actual role
    switch (user.role) {
      case "citizen":
        return <Navigate to="/citizen" replace />;

      case "frontoffice":
        return <Navigate to="/frontoffice" replace />;

      case "secretary":
        return <Navigate to="/secretary" replace />;

      case "chairperson":
        return <Navigate to="/chairperson" replace />;

      case "admin":
        return <Navigate to="/admin" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;