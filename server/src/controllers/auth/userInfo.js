import { storeUserInfo } from "./utils/storeUserInfo.js";

export const userInfo = async (req, res) => {
  try {
    const { info } = req.body;
    if (!info || info.trim().length === 0) {
      return res.status(400).json({ message: "Info is required" });
    }

    const chunksStored = await storeUserInfo(req.user._id.toString(), info);

    res.json({
      success: true,
      chunksStored,
      message: "User info stored in Pinecone successfully",
    });
  } catch (err) {
    console.error("❌ Error in storeUserInfoController:", err);
    res.status(500).json({ message: "Server error" });
  }
};