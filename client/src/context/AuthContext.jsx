import { createContext, useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    setCurrentUserInfo(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const checkUserSession = async () => {
    try {
      const response = await apiRequest.get("/auth/checkSession");
      if (response.status === 200) {
        setCurrentUserInfo(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        setCurrentUserInfo(null);
        localStorage.removeItem("user");
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error checking user session:", error);
      setCurrentUserInfo(null);
      localStorage.removeItem("user");
      navigate("/login"); // Redirect to login page
    }
  };

  useEffect(() => {
    // checkUserSession();
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setCurrentUserInfo(storedUser);
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
      // Handle error gracefully (e.g., clear localStorage or log out user)
    }
  }, []);

  // Save user info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUserInfo));
  }, [currentUserInfo]);

  return (
    <AuthContext.Provider value={{ currentUserInfo, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
