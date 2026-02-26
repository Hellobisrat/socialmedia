import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Optional: group messages or threads
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      default: null
    },

    text: {
      type: String,
      trim: true,
      default: ""
    },

    attachment: {
      type: String, // Cloudinary URL
      default: null
    },

    // Message status
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent"
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);