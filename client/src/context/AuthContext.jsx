import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  
  const [isBusiness, setIsBusiness] = useState(false);
  const [businessFullProfile, setBusinessFullProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      const userId = decodedToken.user.id;
      fetchUserProfile(userId);
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3022/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error obteniendo el perfil:", error.message);
    }
  };

  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUserProfile(null);
    Cookies.remove("token");
  };

  useEffect(() => {
    if (userProfile) {
      checkBusiness();
      checkFullBusinessProfile();
    }
  }, [userProfile]);

  const checkBusiness = () => {
    setIsBusiness(userProfile && userProfile.isBusiness);
  };

  const checkFullBusinessProfile = () => {
    setBusinessFullProfile(
      userProfile &&
        userProfile.isBusiness &&
        userProfile.displayname &&
        userProfile.username &&
        userProfile.businessContact &&
        userProfile.businessAddress
    );
  };

  const contextValue = {
    token,
    userProfile,
    setAuthToken,
    logout,
    isBusiness,
    businessFullProfile,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
