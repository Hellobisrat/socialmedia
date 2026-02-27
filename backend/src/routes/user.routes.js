import express from "express";
import {
  getUserProfile,
  updateProfile,
  updateAvatar,
  updateCover,
  searchUsers,
  suggestUsers,
  deleteAccount,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/:userId", protect, getUserProfile);
router.put("/update", protect, updateProfile);
router.put("/avatar", protect, updateAvatar);
router.put("/cover", protect, updateCover);
router.get("/search", protect, searchUsers);
router.get("/suggestions", protect, suggestUsers);
router.delete("/delete", protect, deleteAccount);

export default router;