import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    igUserId: {
      type: String, // external IG user
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // registered user
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      enum: ["ig_to_user", "user_to_ig"], 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
