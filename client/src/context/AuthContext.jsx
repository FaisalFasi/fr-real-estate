import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    setCurrentUserInfo(data);
  };

  useEffect(() => {
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
