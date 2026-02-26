import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],

    // Optional: group chat name
    name: {
      type: String,
      default: null
    },

    // Optional: group chat image
    avatar: {
      type: String,
      default: null
    },

    // Last message reference for fast chat list loading
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null
    },

    // Unread count per user
    unreadCounts: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        count: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

// Prevent duplicate one-to-one conversations
conversationSchema.index(
  { participants: 1 },
  { unique: false }
);

export default mongoose.model("Conversation", conversationSchema);