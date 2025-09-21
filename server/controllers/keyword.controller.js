import { Reel, User } from "../models/user.model.js"; 
import { USER_LIMIT } from "../utils/constant.js";


export const addKeywordAndMessage = async (req, res) => {
    try {
        const { reelId , keywords, message, isActive} = req.body; 
        let user = req.user;
        const userId = req.user._id;

        if(!Array.isArray(keywords) || keywords.length === 0) {
            return res.status(400).json({ error: "Keywords must be a non-empty array" });
        }

        const reel = await Reel.findOne({ reelId: reelId, user: userId });

        if (!reel) return res.status(404).json({ error: "Reel not found" });

        
        // prohibit user to automate more than one reel
        if(isActive &&  user.activeReelsCount >= USER_LIMIT[user.plan]) {
            return res.json({error : `You can automate more than ${USER_LIMIT[user.plan]} reel.`, user})
        }
        
        const updatedKeywords = Array.from(new Set([...keywords]));
        if(reel.isActive ^ isActive) user.activeReelsCount += isActive ? 1 : -1;

        reel.isActive = isActive;
        reel.keywords = updatedKeywords;
        reel.message = message;
        
        await reel.save();

        
        
        
        await user.save();
        // console.log(reel)
        user = await User.findOne({_id : reel.user}).populate("reels")

        return res.json({
            message: "Keywords added successfully",
            user
        });
    } catch (error) {
        console.error("Error adding keywords:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


