import CommentAutomation from "../../models/commentAutomation.model.js";
import { Reel } from "../../models/user.model.js";


export const addCommentAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { reelId, keyword, commentReplies, dmMessages, dmCard, type} = req.body;

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

    let finalCard = dmCard;
        // if (dmCard?.image_url && dmCard.image_url.startsWith("data:image")) {
        //   const uploadRes = await cloudinary.uploader.upload(dmCard.image_url, {
        //     folder: "reel_automations",
        //   });
        //   finalCard = {...dmCard,
        //     image_url: uploadRes.secure_url,
        //   };
        // }

    const automation = new CommentAutomation({
      reel: reelId,
      keyword,
      commentReplies: Array.isArray(commentReplies) ? commentReplies : [],
      dmMessages: Array.isArray(dmMessages) ? dmMessages : [],
      dmCard: finalCard || null,
      isActive: true,
      user: userId, 
      type
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
