
import mongoose from "mongoose";

const commentAnalyticsSchema = new mongoose.Schema(
  {
    reel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentor:  { type: String, required: true }, 
    
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
