import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const onlineUsers = new Map();

export default function chatSockets(io) {
  io.on("connection", (socket) => {
    // USER CONNECTS
    socket.on("user:online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // JOIN A CONVERSATION ROOM
    socket.on("join-conversation", (conversationId) => {
      socket.join(conversationId);
    });

    // SEND MESSAGE
    socket.on("send-message", async (data) => {
      const { senderId, receiverId, text, attachment } = data;

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

      // Increase unread count for receiver
      const unread = conversation.unreadCounts.find(
        (u) => u.user.toString() === receiverId.toString()
      );
      if (unread) unread.count += 1;

      await conversation.save();

      // Emit message to both users
      io.to(conversation._id.toString()).emit("message:new", message);

      // Notify receiver if online
      const receiverSocket = onlineUsers.get(receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit("notification:new", {
          type: "message",
          senderId,
          message
        });
      }
    });

    // TYPING INDICATOR
    socket.on("typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("typing", { userId });
    });

    socket.on("stop-typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("stop-typing", { userId });
    });

    // MARK MESSAGES AS READ
    socket.on("messages:read", async ({ conversationId, userId }) => {
      await Message.updateMany(
        { conversationId, receiver: userId, status: { $ne: "read" } },
        { status: "read" }
      );

      const conversation = await Conversation.findById(conversationId);
      if (conversation) {
        const unread = conversation.unreadCounts.find(
          (u) => u.user.toString() === userId.toString()
        );
        if (unread) unread.count = 0;
        await conversation.save();
      }

      io.to(conversationId).emit("messages:read", { conversationId, userId });
    });

    // USER DISCONNECTS
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
}