import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "./cart.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// All cart routes require authentication
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.post("/remove", protect, removeFromCart);
router.post("/clear", protect, clearCart);

export default router;