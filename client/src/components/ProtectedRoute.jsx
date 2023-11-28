import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userProfile, token } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  
  useEffect(() => {
    if (userProfile !== undefined && userProfile !== null) {
      setIsAuthChecked(true);
    }
  }, [userProfile]);

  if (!isAuthChecked) {
    return null;
  }

  return userProfile ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
