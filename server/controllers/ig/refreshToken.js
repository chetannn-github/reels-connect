import axios from "axios";
import { User } from "../../models/user.model.js";

export const refreshLongLivedToken = async (req, res) => {
    const access_token  = req.user.access_token;

    try {
        const response = await axios.get('https://graph.instagram.com/refresh_access_token', {
            params: {
                grant_type: 'ig_refresh_token',
                access_token: access_token
            }
        });

        const { access_token: new_token} = response.data;

        const user = await User.findById(req.user._id);
        user.access_token = new_token;
        await user.save();

        res.json({ message: 'Token refreshed', refreshToken:new_token});

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to refresh token' });
    }
};