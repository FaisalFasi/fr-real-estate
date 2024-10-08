import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  savedPostsByUser,
  getNotificationNumber,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/singleUser/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
// router.post("/save", savePost);

router.post("/save", verifyToken, savePost);
router.get("/savedPostsByUser", verifyToken, savedPostsByUser);
router.get("/notification", verifyToken, getNotificationNumber);

export default router;
