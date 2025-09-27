import Instruction from "../../models/instruction.model.js";
import { Reel } from "../../models/user.model.js";
import { pineconeClient } from "../../config/pinecone.js"; // tumhari pinecone config

export const deleteInstruction = async (req, res) => {
  try {
    const { instructionId } = req.body;

    const instruction = await Instruction.findOne({
      _id: instructionId,
      user: req.user._id,
    });

    if (!instruction) {
      return res.status(404).json({ message: "Instruction not found" });
    }

    const reelId = instruction.reel.toString();
    const vectorId = `${reelId}_${instruction._id}`;

    
    await Reel.findByIdAndUpdate(reelId, {
      $pull: { instructions: instruction._id },
    });

    
    await Instruction.deleteOne({ _id: instructionId });

    await pineconeClient
      .index("reels-connect-vector")
      .namespace(reelId)
      .deleteOne(vectorId);

    res.json({ success: true, message: "Instruction deleted successfully" });
  } catch (err) {
    console.error("Error deleting instruction:", err);
    res.status(500).json({ message: "Server error" });
  }
};
