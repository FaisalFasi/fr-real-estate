import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { currentUserInfo } = useContext(AuthContext); // Access auth context

  const [chats, setChats] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({
    receiver: {},
    chatId: "",
  });

  // Fetch chats
  const fetchChats = async () => {
    try {
      const response = await apiRequest("/chats");
      if (!response) return console.log("No chats found");

      setChats(response?.data);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  // Fetch chats when user is authenticated
  useEffect(() => {
    if (currentUserInfo) {
      fetchChats();
    }
  }, [currentUserInfo]);

  const getChatMessages = async (receiverId) => {
    try {
      const response = await apiRequest.get(`/chats/getMessages/${receiverId}`);
      if (response?.data) return response.data;
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        fetchChats,
        chatMessages,
        setChatMessages,
        currentChat,
        setCurrentChat,
        getChatMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext, ChatContextProvider };
export const useChatContext = () => useContext(ChatContext);
