import axios from "axios";
import { User, Reel } from "../../models/user.model.js"; 

export const getAllReels = async (user) => {
    const access_token = user.access_token;
    const userId = user.user_id;
    const fields = ["id", "caption", "media_url", "timestamp", "thumbnail_url"].join(",");
    try {
        const response = await axios.get("https://graph.instagram.com/me/media", {
            params: {
                fields: fields,
                access_token: access_token,
            },
        });

        let reelsResponse = response.data.data;
        //    console.log(reelsResponse)
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
            thumbnailURL : item.thumbnail_url || ""
        }));

        const createdReels = await Reel.insertMany(newReelsData);
        const allReels = [...existingReels.map(r => r._id), ...createdReels.map(r => r._id)];
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        { reels: allReels },
        { new: true }
        ).populate({
            path: "reels",
            options: { sort: { timestamp: -1 } }
        });
    
        updatedUser.access_token = undefined;
        return updatedUser;
    } catch (error) {
        console.error("Error fetching reels:", error.message);
    }
};
