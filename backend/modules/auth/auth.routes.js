import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
} from "./auth.controller.js";
import { protect, verifyRefreshToken } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", verifyRefreshToken, refreshToken);

// Protected routes
router.post("/logout", protect, logout);
router.post("/change-password", protect, changePassword);

export default router;
