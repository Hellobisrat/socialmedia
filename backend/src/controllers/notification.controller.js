import Notification from "../models/Notification.js";

// CREATE NOTIFICATION
export const createNotification = async (req, res) => {
  try {
    const { recipient, type, post, comment, message } = req.body;
    const sender = req.user._id;

    if (recipient === sender.toString()) {
      return res.status(400).json({ message: "You cannot notify yourself" });
    }

    const notification = await Notification.create({
      recipient,
      sender,
      type,
      post: post || null,
      comment: comment || null,
      message: message || null
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL NOTIFICATIONS FOR LOGGED-IN USER
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({
      recipient: userId,
      isDeleted: false
    })
      .populate("sender", "username avatar")
      .populate("post", "media")
      .populate("comment", "text")
      .populate("message", "text attachment")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK ONE NOTIFICATION AS READ
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK ALL NOTIFICATIONS AS READ
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.updateMany(
      { recipient: userId, isRead: false },
      { isRead: true }
    );

    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE NOTIFICATION (SOFT DELETE)
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.isDeleted = true;
    await notification.save();

    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};