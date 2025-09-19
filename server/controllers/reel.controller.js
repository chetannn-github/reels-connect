import axios from "axios";
import { User, Reel } from "../models/user.model.js"; 


export const getAllReels = async (req, res) => {
    const access_token = req.user.access_token;
    const userId = req.user._id;
    const fields = ["id", "caption", "media_url", "timestamp"].join(",");

    try {
        const response = await axios.get("https://graph.instagram.com/me/media", {
            params: {
                fields: fields,
                access_token: access_token,
            },
        });

        let reelsResponse = response.data.data;

        await Reel.deleteMany({ user: userId });

        const reelsData = reelsResponse.map((item) => ({
            reelId: item.id,
            reelTitle: item.caption || " ",
            mediaURL: item.media_url,
            isActive: false,
            keywords: [],
            message: "",
            timestamp: item.timestamp,
            user: userId,
        }));

        const createdReels = await Reel.insertMany(reelsData);

        const reelIds = createdReels.map((r) => r._id);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { reels: reelIds },
            { new: true }
        ).populate("reels");

        return res.json({ user: updatedUser });
    } catch (error) {
        console.error("Error fetching reels:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


export const updateReelStatus = async (req, res) => {
    try {
        const { reelId } = req.body;
        const userId = req.user._id; 


        const reel = await Reel.findOne({reelId: reelId, user: userId });
        if (!reel) {
            return res.status(404).json({ error: "Reel not found" });
        }

        reel.isActive = !reel.isActive;
        await reel.save();

        return res.json({
            message: "Reel status updated successfully",
            reel,
        });
    } catch (error) {
        console.error("Error updating reel status:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};
