
import mongoose from "mongoose";

const commentAnalyticsSchema = new mongoose.Schema(
  {
    reelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commenter:  { type: String, required: true }, 
    
    commentText: {
      type: String,
      required: true,
    },
    dmSent: {
      type: Boolean,
      default: false,
    },
    dmMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CommentAnalytics", commentAnalyticsSchema);
