import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByTeam,
  updateProduct,
  deleteProduct,
  searchProducts,
  fetchClubs,
  fetchJerseys
} from "./products.controller.js";
import { protect, isAdmin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/clubs", fetchClubs)
router.get("/jerseys", fetchJerseys)
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.get("/team/:team", getProductsByTeam);

// Admin routes
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;