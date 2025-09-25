import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    igUserId: {
      type: String, // external IG user id
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Registered user
      ref: "User",
      required: true,
    },
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
