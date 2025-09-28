import CommentAutomation from "../../models/commentAutomation.model.js";
import { Reel } from "../../models/user.model.js";

export const deleteCommentAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { automationId, reelId } = req.body;

    if (!automationId || !reelId) {
      return res.status(400).json({ error: "Automation ID and Reel ID are required" });
    }

    // Find automation and ensure it belongs to the reel
    const automation = await CommentAutomation.findOne({ _id: automationId, reel: reelId, user: userId });
    if (!automation) {
      return res.status(404).json({ error: "Comment automation not found" });
    }

    await automation.deleteOne();
    
    const reel = await Reel.findById(reelId);
    if (reel) {
      reel.commentAutomations = reel.commentAutomations.filter(
        id => id.toString() !== automationId
      );
      await reel.save();
    }

    return res.status(200).json({ message: "Comment automation deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment automation:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
