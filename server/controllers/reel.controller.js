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

        const existingReels = await Reel.find({ user: userId }, "reelId");
        const existingReelIds = existingReels.map(r => r.reelId);

        const newReelsData = reelsResponse
        .filter(item => !existingReelIds.includes(item.id))
        .map(item => ({
            reelId: item.id,
            reelTitle: item.caption || " ",
            mediaURL: item.media_url,
            isActive: false,
            keywords: [],
            message: "this is an automated message from reels-connect",
            timestamp: item.timestamp,
            user: userId,
        }));


        const createdReels = await Reel.insertMany(newReelsData);

        const allReels = [...existingReels.map(r => r._id), ...createdReels.map(r => r._id)];

        const updatedUser = await User.findByIdAndUpdate(
        userId,
        { reels: allReels },
        { new: true }
        ).populate("reels");

        return res.json({ user: updatedUser });
    } catch (error) {
        console.error("Error fetching reels:", error.message);
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
