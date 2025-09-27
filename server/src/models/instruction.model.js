import mongoose from "mongoose";

const instructionSchema = new mongoose.Schema({
  reel: { type: mongoose.Schema.Types.ObjectId, ref: "Reel", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  instruction: { type: String, required: true },    
  // refinedInstruction: { type: String, required: true },
  action: { 
    type: String, 
    enum: ["comment", "comment+dm", "ignore"], 
    required: true 
  },

  commentMessage: { type: String },
  dmMessage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Instruction", instructionSchema);
