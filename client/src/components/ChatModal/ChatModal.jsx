import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal"; // Adjust the path as necessary
import apiRequest from "../../lib/apiRequest";

const ChatModal = ({
  isOpen,
  onClose,
  postId,
  recipientUserId,
  recipientUsername,
  currentUserInfo,
}) => {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchChatData = async () => {
        try {
          const chatDataResponse = await apiRequest.post("/chats/addMessage", {
            receiverId: recipientUserId,
            text: "", // Initial message text
          });

          if (!fetchChatData) return console.log("No chat data found");
          console.log("Chat Data Response", chatDataResponse);

          setChatId(chatDataResponse.data.chatId);
          setMessages([chatDataResponse.data.message]);
        } catch (error) {
          console.error("Error loading chat data:", error);
          setMessages([]); // Fallback to empty messages on error
        }
      };

      fetchChatData();
    }
  }, [isOpen, recipientUserId]);

  useEffect(() => {
    console.log("Chat ID", chatId);
  }, [chatId]);

  // useEffect(() => {
  //   if (isOpen) {
  //     const fetchChatData = async () => {
  //       try {
  //         const chatDataResponse = await apiRequest.post("/chats/addMessage", {
  //           receiverId: recipientUserId,
  //           text: newMessage | "", // Initial message text
  //         });

  //         console.log("Chat Data Response", chatDataResponse);

  //         setChatId(chatDataResponse.data.chatId);
  //         setMessages([chatDataResponse.data.message]);
  //       } catch (error) {
  //         console.error("Error loading chat data:", error);
  //         setMessages([]); // Fallback to empty messages on error
  //       }
  //     };

  //     fetchChatData();
  //   }
  // }, [isOpen, recipientUserId]);

  const handleSendMessage = async () => {
    console.log("Chat ID", chatId);
    if (newMessage.trim() !== "" && chatId) {
      try {
        // Send the message to the existing chat
        const response = await apiRequest.post(`/messages/${chatId}`, {
          text: newMessage,
        });
        const sentMessage = response.data;

        // Add the sent message to the message list
        setMessages([...messages, { text: sentMessage.text, sender: "You" }]);
        setNewMessage(""); // Clear input field
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleContentClick = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up to the background
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-white p-4  flex flex-col w-full h-full md:h-[600px] md:w-[600px] rounded-xl "
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
                className={`mb-2 p-2 rounded break-words hyphens-auto ${
                  msg.sender === "You" ? "bg-blue-200 self-end" : "bg-gray-200"
                }`}
              >
                <strong>{msg.sender}: </strong> {msg.text}
              </div>
            ))
          ) : (
            <p>Add a message..!</p>
          )}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-4 py-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-[#2bbcff] text-black font-bold px-4 py-2 rounded ml-2 hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
