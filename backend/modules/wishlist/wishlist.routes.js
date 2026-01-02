import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isInWishlist,
} from "./wishlist.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// All wishlist routes require authentication
router.get("/", protect, getWishlist);
router.post("/add", protect, addToWishlist);
router.post("/remove", protect, removeFromWishlist);
router.post("/clear", protect, clearWishlist);
router.get("/check/:productId", protect, isInWishlist);

export default router;