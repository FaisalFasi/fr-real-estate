import React, { useContext, useEffect } from "react";
import "./chat.scss";
import { useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore.js";

const Chat = ({ chats }) => {
  const { currentUserInfo } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const [singleChat, setSingleChat] = useState(null);
  const messageEndRef = useRef(null);
  const decreaseNoti = useNotificationStore((state) => state.decrease);

  const handleOpenChat = async (id, receiver) => {
    try {
      // open chat
      const res = await apiRequest.get("/chats/" + id);

      if (!res.data.seenBy.includes(currentUserInfo.id)) {
        decreaseNoti();
      }

      setSingleChat({ ...res.data, receiver });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formtData = new FormData(e.target);
    const text = formtData.get("text");

    if (!text) return alert("Please enter a message");

    try {
      const response = await apiRequest.post("/messages/" + singleChat.id, {
        text,
      });
      setSingleChat((prev) => ({
        ...prev,
        messages: [...prev.messages, response.data],
      }));
      e.target.reset();

      socket.emit("sendMessage", {
        receiverId: singleChat?.receiver?.id,
        data: response?.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        return await apiRequest.put("/chats/read/" + singleChat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (singleChat && socket) {
      socket.on("getMessage", (data) => {
        if (singleChat.id === data.chatId) {
          setSingleChat((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, singleChat, chats]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [singleChat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((chat) => (
          <div
            className="message"
            key={chat.id}
            style={{
              backgroundColor:
                chat.seenBy.includes(currentUserInfo.id) ||
                singleChat?.id === chat.id
                  ? "white"
                  : "lightblue",
            }}
            onClick={() => handleOpenChat(chat.id, chat.receiver)}
          >
            <img src={chat?.receiver?.avatar || "/noavatar.jpg"} alt="icon" />
            <span>{chat?.receiver?.username}</span>
            <p>{chats?.lastMessage}</p>
          </div>
        ))}
      </div>
      {singleChat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={singleChat?.receiver?.avatar || "/noavatar.jpg"}
                alt="icon"
              />
              {singleChat?.receiver?.username}
            </div>
            <span className="close" onClick={() => setSingleChat(false)}>
              X
            </span>
          </div>
          <div className="center">
            {singleChat.messages.map((message) => (
              <div
                className="chatMessage"
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
