import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import setupSocket from "./lib/socket.js";
import http from "http";

// routes import here
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

const server = http.createServer(app); // Create HTTP server using Express app

app.use(express.json());

const cookieParserSecret = process.env.COOKIE_PARSER_SECRET; // Secret key for signing cookies
app.use(cookieParser(cookieParserSecret));

const io = setupSocket(server); // Setup socket.io

// origin: "https://fr-real-estate.netlify.app", // Replace with your Netlify domain
app.use(
  cors({
    origin: true, // Replace with your Netlify domain

    credentials: true, // Allow credentials (cookies)
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
