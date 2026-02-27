import express from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from "../controllers/follow.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/follow/:userId", protect, followUser);
router.post("/unfollow/:userId", protect, unfollowUser);
router.get("/followers/:userId", protect, getFollowers);
router.get("/following/:userId", protect, getFollowing);

export default router;