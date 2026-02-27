import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, attachment } = req.body;
    const senderId = req.user._id;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        unreadCounts: [
          { user: senderId, count: 0 },
          { user: receiverId, count: 1 }
        ]
      });
    }

    // Create message
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      conversationId: conversation._id,
      text: text || "",
      attachment: attachment || null
    });

    // Update last message
    conversation.lastMessage = message._id;

    // Update unread count for receiver
    const unread = conversation.unreadCounts.find(
      (u) => u.user.toString() === receiverId.toString()
    );

    if (unread) unread.count += 1;

    await conversation.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MESSAGES IN A CONVERSATION
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .populate("sender", "username avatar")
      .populate("receiver", "username avatar")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MARK MESSAGES AS READ
export const markAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Reset unread count for this user
    const unread = conversation.unreadCounts.find(
      (u) => u.user.toString() === userId.toString()
    );

    if (unread) unread.count = 0;

    await conversation.save();

    // Update message status
    await Message.updateMany(
      { conversationId, receiver: userId, status: { $ne: "read" } },
      { status: "read" }
    );

    res.json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};