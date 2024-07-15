import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import setupSocket from "./lib/socket.js";
import http from "http";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Routes import here
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

app.use(express.json());

const cookieParserSecret = process.env.JWT_SECRET_KEY; // Secret key for signing cookies
app.use(cookieParser(cookieParserSecret));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Replace with your client domain
    // methods: ["GET", "POST", "PUT", "DELETE"], // Uncomment to restrict HTTP methods
    credentials: true, // Allow credentials (cookies)
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const server = http.createServer(app); // Create HTTP server using Express app
const io = setupSocket(server); // Setup socket.io

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
