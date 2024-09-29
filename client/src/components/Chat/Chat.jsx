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
  const { chats, setChatMessages, chatMessages, getChatMessages } =
    useContext(ChatContext);

  const [chatReceiver, setChatReceiver] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  const messageEndRef = useRef(null);

  const decreaseNoti = useNotificationStore((state) => state.decrease);

  const handleOpenChat = async (chatId, receiver) => {
    try {
      setOpenChat(!openChat);
      setChatReceiver(receiver);
      const res = await getChatMessages(receiver.id);

      if (!res) return console.log("No Messages found");

      setChatMessages(res?.messages);

      if (res.seenBy.includes(currentUserInfo.id)) {
        decreaseNoti();
      }
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
        receiverId: chatReceiver?.id,
      });

      if (response?.data) {
        setChatMessages((prev) => [...prev, response.data.message]);

        e.target.reset();

        socket.emit("sendMessage", {
          receiverId: chatMessages?.receiver?.id,
          data: response?.data,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const read = useCallback(async () => {
    try {
      return await apiRequest.put("/chats/read/" + chatMessages?.id);
    } catch (err) {
      console.log(err);
    }
  }, [chatMessages?.id]);

  useEffect(() => {
    const handleMessage = (data) => {
      if (chatMessages?.id === data.chatId) {
        setChatMessages((prev) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));
        read();
      }
    };

    if (chatMessages && socket) {
      socket.on("getMessage", handleMessage);
    }
    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, [socket, chatMessages, chats]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="chat">
      <div className="messages">
        <h1 className="">Your Chats</h1>
        {chats?.length > 0 ? (
          chats.map((chat) => (
            <div
              className="message"
              key={chat.id}
              style={{
                backgroundColor:
                  chat.seenBy.includes(currentUserInfo.id) ||
                  chatMessages?.id === chat.id
                    ? "white"
                    : "lightblue",
              }}
              onClick={() => handleOpenChat(chat.id, chat.receiver)}
            >
              <img src={chat?.receiver?.avatar || "/noavatar.jpg"} alt="icon" />
              <span>{chat?.receiver?.username}</span>
              <p>{chats?.lastMessage}</p>
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
              <img src={chatReceiver?.avatar || "/noavatar.jpg"} alt="icon" />
              {chatMessages?.receiver?.username}
            </div>
            <span className="close" onClick={() => setOpenChat(!openChat)}>
              X
            </span>
          </div>
          <div className="center">
            {chatMessages?.map((message) => (
              <div
                className={` chatMessage ${
                  message.userId === currentUserInfo.id
                    ? "bg-[#b2d7fc]"
                    : "bg-gray-200"
                }`}
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === currentUserInfo.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUserInfo.id ? "right" : "left",
                }}
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
