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
    localStorage.setItem("user", JSON.stringify(currentUserInfo));
  }, [currentUserInfo]);

  return (
    <AuthContext.Provider value={{ currentUserInfo, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
