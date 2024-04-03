import express from "express";
import postRoutes from "./routes/post.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
