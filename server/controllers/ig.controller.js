import { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI } from '../config/env.js';
import axios from "axios";
import qs from "qs"
import User from '../models/user.model.js';


export const addIgAccount = (req, res) => {
    const scope = [
        'instagram_business_basic',
        'instagram_business_content_publish',
        'instagram_business_manage_messages',
        'instagram_business_manage_comments'
    ].join(',');

    const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(INSTAGRAM_REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&response_type=code`;

    res.json({ url: instagramAuthUrl });
};





export const callbackIgAccount = async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).json({ message: 'Authorization code missing' });
    }

    try {
        const data = qs.stringify({
            client_id: INSTAGRAM_APP_ID,
            client_secret: INSTAGRAM_APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: INSTAGRAM_REDIRECT_URI,
            code: code
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const response = await axios.post('https://api.instagram.com/oauth/access_token', data, config);

        console.log(response)

        const { access_token, user_id } = response.data;

        // Save access token in user profile
        const user = await User.findById(req.user._id);
        user.instagram = {
            user_id,
            access_token,
        };
        await user.save();
        console.log(user);
        return res.json({sucess : "majaa aagyaa broo"})

        // return getLongLivedToken(req,res);

        

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to link Instagram account' });
    }
};


export const getLongLivedToken = async (req, res) => {
    const  access_token  = req.user.instagram.access_token;

    try {
        const response = await axios.get('https://graph.instagram.com/access_token', {
            params: {
                grant_type: 'ig_exchange_token',
                client_secret: INSTAGRAM_APP_SECRET,
                access_token,
            }
        });

        const { access_token: long_token, expires_in } = response.data;

        const user = await User.findById(req.user._id);
        user.instagram.access_token = long_token;
        user.instagram.expires_in = expires_in;
        await user.save();

        res.json({ message: 'Long-lived token updated', token: long_token });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to refresh token' });
    }
};



export const refreshLongLivedToken = async (req, res) => {
    const access_token  = req.user.instagram.access_token;

    try {
        const response = await axios.get('https://graph.instagram.com/refresh_access_token', {
            params: {
                grant_type: 'ig_refresh_token',
                access_token: access_token
            }
        });

        const { access_token: new_token, expires_in } = response.data;

        const user = await User.findById(req.user._id);
        user.instagram.access_token = new_token;
        user.instagram.expires_in = expires_in;
        await user.save();

        res.json({ message: 'Token refreshed', token: new_token });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to refresh token' });
    }
};
