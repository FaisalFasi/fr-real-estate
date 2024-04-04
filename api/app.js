import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
// app.use("/api/post", postRoutes);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
