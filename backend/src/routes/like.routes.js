import express from "express";
import {
  togglePostLike,
  toggleCommentLike,
} from "../controllers/like.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/post/:postId", protect, togglePostLike);
router.put("/comment/:commentId", protect, toggleCommentLike);

export default router;