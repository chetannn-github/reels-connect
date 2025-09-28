import mongoose from "mongoose";

const buttonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["web_url"], default: "web_url" },
  url: { type: String, required: true },
}, { _id: false });


const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  image_url: { type: String, default: "" },
  button: { type: buttonSchema, default: null },
}, { _id: false });


const commentAutomationSchema = new mongoose.Schema({
  reel: { type: mongoose.Schema.Types.ObjectId, ref: "Reel", required: true },
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  keyword: { type: String, required: true },         
  commentReplies: { type: [String], default: [] },
  dmMessages: { type: [String], default: [] }, 
  dmCard: { type: cardSchema, default: null },     
  isActive: { type: Boolean, default: true },
  triggerCount: { type: Number, default: 0 }
}, { timestamps: true });

const CommentAutomation = mongoose.model("CommentAutomation", commentAutomationSchema);

export default CommentAutomation;
