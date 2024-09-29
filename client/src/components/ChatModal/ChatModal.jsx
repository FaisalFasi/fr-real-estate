import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [newMessageSent, setNewMessageSent] = useState("");
  const { chatMessages, setChatMessages, getChatMessages } = useChatContext();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (isOpen && recipientUserId) {
        const response = await getChatMessages(recipientUserId);
        if (response) {
          console.log(
            "Chat Messages when open model:-----",
            response?.messages
          );

          setChatMessages(response.messages);
        }
      }
    };
    fetchChatMessages();
  }, [isOpen, recipientUserId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessageSent.trim()) return alert("Message is empty");

    try {
      const response = await apiRequest.post("/chats/addMessage", {
        text: newMessageSent,
        receiverId: recipientUserId,
      });

      if (response?.data) {
        console.log("Sent Message:", response.data.message.text);
        setChatMessages((prev) => [...prev, response.data.message]);

        setNewMessageSent(""); // Clear input after sending
        // return response.data;
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleContentClick = useCallback((e) => {
    e.stopPropagation(); // Stop the event from bubbling up to the background
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="bg-white p-4 flex flex-col w-full h-full md:h-[600px] md:w-[600px] rounded-xl"
        onClick={handleContentClick}
      >
        <div className="mb-4 p-4 font-bold text-xl text-center bg-[#2bbcff] rounded-lg">
          <h2>Send a Message</h2>
        </div>
        <div className="flex-1 overflow-auto md:px-4">
          {chatMessages?.length > 0 ? (
            chatMessages?.map((msg, index) => (
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
                        className="w-[30px] object-cover  h-[30px] rounded-full"
                      />
                    </span>
                  ) : (
                    <span className="flex items-center gap-4">
                      {/* <img
                        src={receiverUser?.avatar}
                        width={30}
                        height={30}
                        alt="User Avatar"
                        className="w-[30px] object-cover h-[30px] rounded-full"
                      /> */}
                      <span>{msg.text}</span>
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Write a message to start a chat...!</p>
          )}
          <div ref={messageEndRef} />
        </div>

        <div className="flex mt-4">
          <form className="w-full flex" onSubmit={handleSendMessage}>
            <input
              name="message"
              type="text"
              className="flex-1 border border-gray-300 rounded px-4 py-2"
              placeholder="Type your message..."
              value={newMessageSent}
              onChange={(e) => setNewMessageSent(e.target.value)}
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

// const { singleChat, setSingleChat, sendModelChatMessage, handleOpenChat } =
//     useChatContext();

//   // Fetch chat messages when modal is opened
//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       if (isOpen && recipientUserId) {
//         const fetchedChat = await handleOpenChat(recipientUserId);
//         if (fetchedChat) {
//           console.log("Fetched Messages:", fetchedChat);
//           setSingleChat(fetchedChat.messages);
//         }
//       }
//     };
//     fetchChatMessages();
//   }, [isOpen, recipientUserId, handleOpenChat, setSingleChat]);

//   useEffect(() => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [singleChat]);

//   // Memoized handleSendMessage function
//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     if (!newMessage.trim()) return alert("Message is empty");

//     try {
//       const sentMessage = await sendModelChatMessage(
//         recipientUserId,
//         newMessage
//       );
//       setSingleChat((prevMessages) => [...prevMessages, sentMessage]); // Update chat with the new message

//       setNewMessage(""); // Clear input after sending
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };
