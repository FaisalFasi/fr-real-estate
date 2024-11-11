import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./index.scss";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { ChatContextProvider } from "./context/ChatContext.jsx";
import { PostsProvider } from "./context/PostsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsProvider>
        <SocketContextProvider>
          <ChatContextProvider>
            <App />
          </ChatContextProvider>
        </SocketContextProvider>
      </PostsProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
