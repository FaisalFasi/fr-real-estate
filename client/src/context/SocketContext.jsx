import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUserInfo } = useContext(AuthContext);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    currentUserInfo && socket?.emit("newUser", currentUserInfo._id);
  }, [currentUserInfo, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
