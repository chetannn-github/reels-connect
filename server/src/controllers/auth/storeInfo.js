import { processAndSaveUserInfo } from "./utils/processAndSaveUserInfo.js";

export const storeInfo = async (req, res) => {
  try {
    const { formData } = req.body;
    const uploadedFiles = req.files || [];

    const chunksStored = await processAndSaveUserInfo(req.user._id.toString(),JSON.parse(formData), uploadedFiles);

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