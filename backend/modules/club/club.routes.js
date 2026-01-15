import express from "express";
import {
  createClub,
  getAllClubs,
  getClubsByLeague,
  getClubById,
  getClubsGroupedByLeague,
  updateClub,
  deleteClub,
  searchClubs,
} from "./club.controller.js";
import { protect, isAdmin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================
router.get("/", getAllClubs);
router.get("/grouped", getClubsGroupedByLeague); // Get clubs grouped by league
router.get("/search", searchClubs);
router.get("/league/:league", getClubsByLeague);
router.get("/:id", getClubById);

// ============================================
// ADMIN ONLY ROUTES
// ============================================
router.post("/", protect, isAdmin, createClub);
router.put("/:id", protect, isAdmin, updateClub);
router.delete("/:id", protect, isAdmin, deleteClub);

export default router;