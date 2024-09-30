import express from "express";
import {
  checkSession,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkSession", checkSession); // New route for checking session

export default router;
