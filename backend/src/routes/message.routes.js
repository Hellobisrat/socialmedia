import express from "express";
import {
  sendMessage,
  getMessages,
  markAsRead,
  getUnreadCount
} from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/:conversationId", protect, getMessages);
router.put("/read/:conversationId", protect, markAsRead);
router.get("/unread", protect, getUnreadCount);




export default router;
