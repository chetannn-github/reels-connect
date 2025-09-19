import { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI } from '../config/env.js';
import axios from "axios";
import qs from "qs"
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';


export const addIgAccount = (req, res) => {
    try {
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
    res.redirect(instagramAuthUrl);
    } catch (error) {
        console.log(error.message)
    }
   
};


export const callbackIgAccount = async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ message: 'Authorization code missing'});

    try {
        const data = qs.stringify({
            client_id: INSTAGRAM_APP_ID,
            client_secret: INSTAGRAM_APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: "https://reels-connect.onrender.com/api/ig/callback",
            code: code
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let response = await axios.post('https://api.instagram.com/oauth/access_token', data, config);
        const { access_token, user_id } = response.data;
        
        let user = await User.findOne({user_id});
        if(!user) user = new User({user_id});
        user.access_token = access_token;
        await user.save();
        
        
        response = await axios.get('https://graph.instagram.com/access_token', {
            params: {
                grant_type: 'ig_exchange_token',
                client_secret: INSTAGRAM_APP_SECRET,
                access_token,
            }
        });

        const { access_token: long_token } = response.data;
        user.access_token = long_token;
        await user.save();
        const jwtToken = generateToken({ user_id: user.user_id });





        const userInfoRes = await axios.get(`https://graph.instagram.com/v23.0/me`, {
            params: {
                fields: "id,username,followers_count,name,profile_picture_url,media_count",
                access_token: long_token,
            },
        });

        console.log(userInfoRes?.data)

        const {username, followers_count, name, profile_picture_url, media_count } =userInfoRes?.data;
        user.username = username;
        user.followers = followers_count;
        user.name = name;
        user.profileURL = profile_picture_url;
        await user.save();
        res.json({ message: 'Long-lived token updated', token: long_token, jwtToken , user});

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: error.response?.data || error.message });
    }
};



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
