import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { currentUserInfo } = useContext(AuthContext); // Access auth context
  const [chats, setChats] = useState([]);

  // console.log("Data in Chat context", chats);

  const fetchChats = async () => {
    try {
      const response = await apiRequest("/chats");

      if (!response) return console.log("No chats found");

      // console.log("Chats Response length", response.data.length);
      setChats(response?.data);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  useEffect(() => {
    // console.log("Chats Context useEffect", chats);
    if (currentUserInfo) {
      fetchChats();
    }
  }, [setChats, currentUserInfo]);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext, ChatContextProvider };
export const useChatContext = () => useContext(ChatContext);
