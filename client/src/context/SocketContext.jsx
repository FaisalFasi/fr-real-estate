import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUserInfo } = useContext(AuthContext);

  useEffect(() => {
    // console.log(process.env.SOCKET_IO_SERVER_URL);
    setSocket(io("http://localhost:8800"));
    // Clean up the socket connection on component unmount (if needed)
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    currentUserInfo && socket?.emit("newUser", currentUserInfo.id);
  }, [currentUserInfo, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
