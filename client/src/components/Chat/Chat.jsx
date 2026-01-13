import React, { useCallback, useContext, useEffect } from "react";
import "./chat.scss";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore.js";
import ShowText from "../ShowText/ShowText.jsx";
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { currentUserInfo } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const {
    chats,
    setChatMessages,
    chatMessages,
    getChatMessages,
    currentChat,
    setCurrentChat,
  } = useContext(ChatContext);

  const [openChat, setOpenChat] = useState(false);

  const messageEndRef = useRef(null);

  const decreaseNoti = useNotificationStore((state) => state.decrease);

  const handleOpenChat = async (chatId, receiver) => {
    setOpenChat(!openChat);
    setCurrentChat({ chatId: chatId, receiver: receiver });

    try {
      const res = await getChatMessages(receiver.id);

      if (!res.seenBy.includes(currentUserInfo.id)) {
        decreaseNoti();
      }

      setChatMessages(res?.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formtData = new FormData(e.target);
    const inputText = formtData.get("text");

    if (!inputText.trim()) return alert("Message is empty");

    try {
      const response = await apiRequest.post("/chats/addMessage", {
        text: inputText,
        receiverId: currentChat?.receiver.id,
      });

      if (response?.data) {
        setChatMessages((prev) => [...prev, response.data.message]);

        e.target.reset();

        socket.emit("sendMessage", {
          receiverId: currentChat.receiver?.id,
          data: response?.data,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + currentChat?.chatId);
      } catch (err) {
        console.log(err);
      }
    };

    const handleIncomingMessage = (data) => {
      if (currentChat?.chatId === data?.chatId) {
        setChatMessages((prev) => [...prev, data?.message]);
        read();
      }
    };

    if (socket && currentChat?.chatId) {
      socket.on("getMessage", handleIncomingMessage);
    }

    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket, currentChat]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="chat">
      <div className="messages">
        <h1 className=" ">Your Chats</h1>
        {chats?.length > 0 ? (
          chats.map((chat, index) => (
            <div
              key={`${chat?.id}-${index}`}
              className={`message ${
                chat.seenBy.includes(currentUserInfo.id) ||
                chatMessages?.id === chat.id
                  ? "seen"
                  : "unseen"
              }`}
              onClick={() => handleOpenChat(chat.id, chat.receiver)}
            >
              <img src={chat?.receiver?.avatar || "/noavatar.jpg"} alt="icon" />
              <span>{chat?.receiver?.username}</span>
              <p>{chat?.lastMessage || "No messages yet"}</p>
            </div>
          ))
        ) : (
          <ShowText message="No Chat found" />
        )}
      </div>
      {chatMessages && openChat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={currentChat.receiver?.avatar || "/noavatar.jpg"}
                alt="icon"
              />
              {/* {currentChat?.receiver?.username} */}
            </div>
            <h2>{currentChat?.receiver?.username || "User Name"}</h2>
            <span className="close" onClick={() => setOpenChat(!openChat)}>
              X
            </span>
          </div>
          <div className="center">
            {chatMessages?.map((message, index) => (
              <div
                key={`${message.id}-${index}`}
                className={`chatMessage ${
                  message.userId === currentUserInfo.id ? "own" : "other"
                }`}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" cols="30" rows="10"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
