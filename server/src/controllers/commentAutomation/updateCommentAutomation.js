import CommentAutomation from "../../models/commentAutomation.model.js";

export const updateCommentAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const {reelId, automationId, keyword, commentReplies, dmMessages, dmCard, isActive , type} = req.body;

    if (!automationId) {
      return res.status(400).json({ error: "Automation ID is required" });
    }

    const automation = await CommentAutomation.findOne({ _id: automationId, reel: reelId , user : userId});
    if (!automation) {
      return res.status(404).json({ error: "Comment automation not found" });
    }

    if (keyword !== undefined) automation.keyword = keyword;
    if (Array.isArray(commentReplies)) automation.commentReplies = commentReplies;
    if (Array.isArray(dmMessages)) automation.dmMessages = dmMessages;
    if (dmCard !== undefined) automation.dmCard = dmCard;
    if (isActive !== undefined) automation.isActive = isActive;
    automation.type = type;

    await automation.save();

    return res.status(200).json({ message: "Comment automation updated successfully", automation });
  } catch (error) {
    console.error("Error updating comment automation:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
