import CommentAutomation from "../../models/commentAutomation.model.js";

export const getCommentAutomation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { reelId } = req.params;
    const automations = await CommentAutomation.find( { reel : reelId, user: userId})
      .populate("reel", "reelId reelTitle mediaURL thumbnailURL")
      .sort({ createdAt: -1 });

    return res.status(200).json({ automations });
  } catch (error) {
    console.error("Error fetching comment automations:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
