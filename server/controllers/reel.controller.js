import axios from "axios";
import User from "../models/user.model.js";

export const getAllReels = async(req, res) => {
    const access_token  = req.user.access_token;
    const userId = req.user._id;
    const fields  = ['id','caption','media_url', 'timestamp'].join(',');

    try {
        const response = await axios.get('https://graph.instagram.com/me/media', {
            params: {
                fields : fields,
                access_token: access_token
            }
        });

        let reelsResponse = response.data.data;

        const reelsData = reelsResponse.map((item) => ({
            reelId: item.id,
            reelTitle:item.caption || "",
            mediaURL: item.media_url,
            isActive: false,
            keywords: [],
            message: "",
            timestamp : item.timestamp
        }));

       console.log(response.data);

        const updatedUser = await User.findOneAndUpdate(
            {_id: userId },
            { $push: { reels: { $each: reelsData } } },
            { new: true }
        );
       
        return res.json({user : updatedUser})
    }   catch(error){
        console.log(error)
    }
}

export const addReel = (req, res) => {
    res.send('Add a new reel endpoint');
};

export const updateReel = (req, res) => {
    res.send('Update reel endpoint');
};

export const deleteReel = (req, res) => {
    res.send('Delete reel endpoint');
};
