import { Reel } from "../models/user.model.js"; 


export const addKeywordAndMessage = async (req, res) => {
    try {
        const { reelId , keywords, message} = req.body; 
        const userId = req.user._id;


        if(!Array.isArray(keywords) || keywords.length === 0) {
            return res.status(400).json({ error: "Keywords must be a non-empty array" });
        }

        const reel = await Reel.findOne({ reelId: reelId, user: userId });

        if (!reel) return res.status(404).json({ error: "Reel not found" });
        
        const updatedKeywords = Array.from(new Set([...reel.keywords, ...keywords]));
        reel.isActive = true;
        reel.keywords = updatedKeywords;
        reel.message = message;
        await reel.save();

        return res.json({
            message: "Keywords added successfully",
            reel,
        });
    } catch (error) {
        console.error("Error adding keywords:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


