import mongoose from "mongoose";

const dmAutomationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // kis user ka hai
  keyword: { type: String, required: true },    
  dmMessages: { type: [String], default: [] },    
  isActive: { type: Boolean, default: true },     
  triggerCount: { type: Number, default: 0 }, 
}, { timestamps: true });

const DMAutomation = mongoose.model("DMAutomation", dmAutomationSchema);

export default DMAutomation;
