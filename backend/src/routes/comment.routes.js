import express from "express";
import {
  createComment,
  getCommentsByPost,
  toggleLikeComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createComment);
router.get("/:postId", protect, getCommentsByPost);
router.put("/like/:commentId", protect, toggleLikeComment);
router.delete("/:commentId", protect, deleteComment);

export default router;