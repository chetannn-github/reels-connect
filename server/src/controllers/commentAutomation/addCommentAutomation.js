import CommentAutomation from "../../models/commentAutomation.model.js";
import { Reel } from "../../models/user.model.js";


export const addCommentAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { reelId, keyword, commentReplies, dmMessages, dmCard, isActive } = req.body;

    if (!reelId || !keyword) {
      return res.status(400).json({ error: "Reel ID and keyword are required" });
    }

    const reel = await Reel.findOne({ _id: reelId, user: userId });
    if (!reel) {
      return res.status(404).json({ error: "Reel not found" });
    }

    const exists = await CommentAutomation.findOne({ reel: reelId, keyword });
    if (exists) {
      return res.status(400).json({ error: "Keyword already exists for this reel" });
    }

    const automation = new CommentAutomation({
      reel: reelId,
      keyword,
      commentReplies: Array.isArray(commentReplies) ? commentReplies : [],
      dmMessages: Array.isArray(dmMessages) ? dmMessages : [],
      dmCard: dmCard || null,
      isActive: isActive ?? true,
      user: userId
    });

    await automation.save();
    reel.commentAutomations.push(automation._id);
    await reel.save();

    return res.status(201).json({ message: "Comment automation added successfully", automation });
  } catch (error) {
    console.error("Error adding comment automation:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
