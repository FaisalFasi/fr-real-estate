import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "./AuthContext"; // Import AuthContext
import { useNotificationStore } from "../lib/notificationStore";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { currentUserInfo } = useContext(AuthContext); // Access auth context

  const [chatMessages, setChatMessages] = useState([]);

  const [chats, setChats] = useState([]);
  const decreaseNoti = useNotificationStore((state) => state.decrease);

  // Fetch chats
  const fetchChats = async () => {
    try {
      const response = await apiRequest("/chats");
      if (!response) return console.log("No chats found");

      console.log("Chats>>>>>:", response.data);
      setChats(response?.data);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  };

  // Fetch chats when user is authenticated
  useEffect(() => {
    if (currentUserInfo) {
      fetchChats();
      console.log("Chat received ----: ", chats);
    }
  }, [currentUserInfo]);

  // Listen for incoming messages via socket and update UI
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("newMessage", (newMessage) => {
  //       // Update the chat with the new message
  //       setChats((prevChats) =>
  //         prevChats.map((chat) =>
  //           chat.id === newMessage.chatId
  //             ? { ...chat, lastMessage: newMessage.text }
  //             : chat
  //         )
  //       );
  //       setSingleChat((prev) =>
  //         prev && prev.id === newMessage.chatId
  //           ? { ...prev, messages: [...prev.messages, newMessage] }
  //           : prev
  //       );
  //     });
  //   }
  // }, [socket]);

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
        chatMessages,
        setChatMessages,
        getChatMessages,
        chats,
        setChats,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext, ChatContextProvider };
export const useChatContext = () => useContext(ChatContext);
