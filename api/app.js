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
const io = setupSocket(server); // Setup socket.io

const allowedOrigins = [
  "https://fr-real-estate.netlify.app/",
  "https://fr-real-estate.netlify.app",
  "http://localhost:5173", // Add additional localhost origin if needed
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // For requests without an origin (e.g., same-origin requests)
        return callback(null, true);
      }

      // Check if the origin matches one of the allowed origins
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes(new URL(origin).origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST", "PUT", "GET", "DELETE"],

    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
app.use(cookieParser());

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
