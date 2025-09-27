import Instruction from "../../models/instruction.model.js";

export const getInstruction = async (req, res) => {
  try {
    const { reelId } = req.body;

    
    const instructions = await Instruction.find({
      reel: reelId,
      user: req.user._id
    });

    if (!instructions.length) {
      return res.json({ success: true, data: [], message: "No instructions found" });
    }

    res.json({ success: true, data: instructions });
  } catch (err) {
    console.error("Error fetching instructions:", err);
    res.status(500).json({ message: "Server error" });
  }
};