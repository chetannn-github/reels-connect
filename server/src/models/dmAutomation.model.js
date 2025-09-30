import mongoose from "mongoose";

const buttonSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String, enum: ["web_url"], default: "web_url" },
  url: { type: String},
}, { _id: false });


const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  image_url: { type: String, default: "" },
  button: { type: buttonSchema, default: [] },
}, { _id: false });


const dmAutomationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  keyword: { type: String, required: true },                                    
  dmMessages: { type: [String], default: [] },
  card: { type: cardSchema, default: null }, 
  isActive: { type: Boolean, default: true },
  triggerCount: { type: Number, default: 0 },
  type : {type : String, enum : ["text", "card"]}
}, { timestamps: true });

const DMAutomation = mongoose.model("DMAutomation", dmAutomationSchema);

export default DMAutomation;
