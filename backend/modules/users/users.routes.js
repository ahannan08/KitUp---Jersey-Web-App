import express from "express";
import {
  getProfile,
  updateProfile,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./user.controller.js";
import { protect, isAdmin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Protected routes (user)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin routes
router.get("/", protect, isAdmin, getAllUsers);
router.get("/:id", protect, isAdmin, getUserById);
router.put("/:id", protect, isAdmin, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;