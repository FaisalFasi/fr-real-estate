import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal"; // Adjust the path as necessary
import apiRequest from "../../lib/apiRequest";
import { useChatContext } from "../../context/ChatContext";

const ChatModal = ({
  isOpen,
  onClose,
  recipientUserId,
  postOwner,
  currentUserInfo,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { setChats } = useChatContext();

  useEffect(() => {
    if (isOpen) {
      fetchChatMessages(); // Fetch messages when the modal opens
    }
  }, [isOpen]);

  const fetchChatMessages = async () => {
    try {
      const response = await apiRequest(
        `/chats/getMessages/${recipientUserId}`
      );
      if (response && response.data) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchChatData = async (newMessage) => {
    try {
      const chatDataResponse = await apiRequest.post("/chats/addMessage", {
        receiverId: recipientUserId,
        text: newMessage,
      });

      const { chat, message } = chatDataResponse?.data;

      setChats((prevChats) => {
        const existingChatIndex = prevChats.findIndex((c) => c.id === chat.id);
        if (existingChatIndex > -1) {
          const updatedChats = [...prevChats];
          updatedChats[existingChatIndex] = {
            ...chat,
            lastMessage: message.text,
          };
          return updatedChats;
        }
        return [...prevChats, { ...chat, lastMessage: message }];
      });
      setMessages([...messages, { ...message, userId: currentUserInfo.id }]);
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error loading chat data:", error);
      setMessages([]); // Fallback to empty messages on error
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMessage = formData.get("message");

    if (!newMessage.trim()) return console.log("Message is empty");

    fetchChatData(newMessage);
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up to the background
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-white p-4 flex flex-col w-full h-full md:h-[600px] md:w-[600px] rounded-xl"
        onClick={handleContentClick}
      >
        <div className="mb-4 p-4 font-bold text-xl text-center bg-[#2bbcff] rounded-lg">
          <h2>Send a Message</h2>
        </div>
        <div className="flex-1 overflow-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.userId === currentUserInfo.id
                    ? "justify-end" // Right align for current user
                    : "justify-start" // Left align for other user
                }`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg ${
                    msg.userId === currentUserInfo.id
                      ? "bg-blue-200 text-right" // Right aligned bubble for current user
                      : "bg-gray-200 text-left" // Left aligned bubble for other user
                  }`}
                >
                  {msg.userId === currentUserInfo.id ? (
                    <span className="flex items-center gap-4">
                      <span>{msg.text}</span>
                      <img
                        src={currentUserInfo?.avatar}
                        width={30}
                        height={30}
                        alt="User Avatar"
                        className="rounded-full"
                      />
                    </span>
                  ) : (
                    <span className="flex items-center gap-4">
                      <img
                        src={postOwner?.avatar}
                        width={30}
                        height={30}
                        alt="User Avatar"
                        className="rounded-full"
                      />
                      <span>{msg.text}</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Write a message to start a chat...!</p>
          )}
        </div>

        <div className="flex mt-4">
          <form className="w-full flex" onSubmit={handleSendMessage}>
            <input
              name="message"
              type="text"
              className="flex-1 border border-gray-300 rounded px-4 py-2"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-[#2bbcff] text-black font-bold px-4 py-2 rounded ml-2 hover:bg-blue-600"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
