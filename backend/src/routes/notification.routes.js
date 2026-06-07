import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
} from "../controllers/notification.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createNotification);
router.get("/", protect, getNotifications);
router.put("/:notificationId/read", protect, markAsRead);
router.put("/read-all", protect, markAllAsRead);
router.delete("/:notificationId", protect, deleteNotification);
router.get("/unread/count", protect, getUnreadCount);


export default router;