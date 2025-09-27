import { Reel } from "../../models/user.model.js";
import { enhanceInstructionPrompt } from "../../utils/prompts.js";
import { generateEmbedding, getOpenAIResponse } from "../../config/openai.js";
import { pineconeClient } from "../../config/pinecone.js";
import Instruction from "../../models/instruction.model.js";


export const createInstruction = async (req, res) => {
    try {
        const { instruction, action, commentMessage, dmMessage, reelId} = req.body;

        const reel = await Reel.findOne({ _id: reelId, user: req.user._id });
        if (!reel) return res.status(404).json({ message: "Reel not found" });

        const promptToEnhanceInstruction = enhanceInstructionPrompt(instruction);
        const refined = await getOpenAIResponse(promptToEnhanceInstruction);

        const newInstruction = new Instruction({
            reel: reelId,
            user: req.user._id,
            instruction,
            refinedInstruction: refined,
            action,
            commentMessage,
            dmMessage
        });
        await newInstruction.save();

        reel.instructions.push(newInstruction._id);
        await reel.save();

        
        const embedding = await generateEmbedding(refined);
        const vectorId = `${reelId}_${newInstruction._id}`;

        await pineconeClient.index("instructions")
        .namespace(reelId.toString())
        .upsert([{
            id: vectorId,
            values: embedding,
            metadata: {
            reelId,
            instructionId: newInstruction._id.toString(),
            action,
            commentMessage,
            dmMessage
            }
        }]);

        res.json({ success: true, data: newInstruction });
  } catch (err) {
    console.error("Error creating instruction:", err);
    res.status(500).json({ message: "Server error" });
  }
};


