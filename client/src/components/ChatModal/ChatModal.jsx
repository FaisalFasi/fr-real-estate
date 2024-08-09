import React, { useState } from "react";
import Modal from "../Modal/Modal"; // Adjust the path as necessary

const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { text: message, sender: "You" }]);
      setMessage("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-4  flex flex-col h-[calc(100vh-8rem)] rounded-xl ">
        <div className="flex-1 overflow-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                msg.sender === "You" ? "bg-blue-200 self-end" : "bg-gray-200"
              }`}
            >
              <strong>{msg.sender}: </strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-4 py-2"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
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
