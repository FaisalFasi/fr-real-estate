import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { AuthContext } from "./AuthContext"; // Import AuthContext
import { useCallback } from "react";
import { useNotificationStore } from "../lib/notificationStore";
import { SocketContext } from "./SocketContext";

const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const { currentUserInfo } = useContext(AuthContext); // Access auth context
  const { socket } = useContext(SocketContext);

  const [chats, setChats] = useState([]);
  const [singleChat, setSingleChat] = useState(null);
  const decreaseNoti = useNotificationStore((state) => state.decrease);

  const [receiverUser, setReceiverUser] = useState([]);

  // Get chat receiver user
  const getChatReceiverUser = async (recipientUserId) => {
    try {
      const response = await apiRequest(`/users/singleUser/${recipientUserId}`);

      console.log("Receiver User outer", response.data.avatar);
      console.log("Receiver User", response.data.avatar);
      return response.data;
      // setReceiverUser(response.data);
    } catch (error) {
      console.error("Error fetching chat receiver user:", error);
    }
  };

  // Fetch chats
  const fetchChats = useCallback(async () => {
    try {
      const response = await apiRequest("/chats");
      if (!response) return console.log("No chats found");
      setChats(response?.data);
    } catch (error) {
      console.error("Error fetching chats", error);
    }
  }, []);
  // Fetch chats when user is authenticated
  useEffect(() => {
    if (currentUserInfo) {
      fetchChats();
    }
  }, [setChats, currentUserInfo]);

  // start Chat function
  const handleOpenChatModal = useCallback(async (recipientUserId) => {
    try {
      const response = await apiRequest(
        `/chats/getMessages/${recipientUserId}`
      );
      if (response && response.data) {
        return response.data.messages;
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  // Open single chat
  const handleOpenChat = useCallback(
    async (chatId, receiver) => {
      console.log("Opening chat with:", receiver);
      try {
        // open chat
        const res = await apiRequest.get("/chats/" + chatId);
        if (!res.data.seenBy.includes(currentUserInfo.id)) {
          decreaseNoti();
        }
        console.log("Chat opened:", res.data);
        setSingleChat({ ...res.data, receiver });
      } catch (err) {
        console.error("Error opening chat:", err);
      }
    },
    [decreaseNoti]
  );

  // Send message to chat
  const sendMessage = useCallback(
    async (receiverId, message) => {
      try {
        if (!receiverId || !message.trim()) {
          console.log("Receiver ID  is missing", receiverId);
          console.log("  message is missing", message);
          return;
        }
        const response = await apiRequest.post("/chats/addMessage", {
          receiverId: receiverId,
          text: message,
        });

        const { chat, message: respondMessage } = response?.data;

        // setSingleChat((prev) => ({
        //   ...prev,
        //   messages: [...prev.messages, respondMessage],
        // }));

        socket.emit("sendMessage", {
          receiverId: receiverId,
          data: respondMessage,
        });

        // Update last message in chat list
        setChats((prevChats) => {
          const existingChatIndex = prevChats.findIndex(
            (c) => c.id === chat.id
          );
          if (existingChatIndex > -1) {
            const updatedChats = [...prevChats];
            updatedChats[existingChatIndex] = {
              ...chat,
              lastMessage: respondMessage.text,
            };
            return updatedChats;
          }
          return [...prevChats, { ...chat, lastMessage: respondMessage }];
        });

        return respondMessage;
      } catch (err) {
        console.error(
          "Error sending message:",
          err.response || err.message || err
        );
      }
    },
    [socket]
  );

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        singleChat,
        setSingleChat,
        fetchChats,
        handleOpenChat,
        sendMessage,
        handleOpenChatModal,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export { ChatContext, ChatContextProvider };
export const useChatContext = () => useContext(ChatContext);
