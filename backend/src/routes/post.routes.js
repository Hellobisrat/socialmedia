import express from "express";
import {
  createPost,
  getPost,
  getUserPosts,
  getFeed,
  updatePost,
  deletePost,
  searchByHashtag,
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/feed", protect, getFeed);
router.get("/user/:userId", protect, getUserPosts);
router.get("/search/:tag", protect, searchByHashtag);
router.get("/:postId", protect, getPost);
router.put("/:postId", protect, updatePost);
router.delete("/:postId", protect, deletePost);

export default router;