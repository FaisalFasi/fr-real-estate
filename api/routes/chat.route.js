import express from "express";
import {
  getChats,
  getChat,
  addChat,
  readChat,
  addChatAndMessage,
  getChatMessages,
} from "../controllers/chat.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.get("/getMessages/:id", verifyToken, getChatMessages);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);
router.post("/addMessage", verifyToken, addChatAndMessage);

export default router;
