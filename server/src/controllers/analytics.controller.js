import CommentAnalytics from "../models/comment.analytics.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const analytics = await CommentAnalytics.find({ user : userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "reel",
        select: "mediaURL thumbnailURL", 
      })
      
    res.status(200).json({
      success: true,
      count: analytics.length,
      data: analytics,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching analytics",
    });
  }
};
