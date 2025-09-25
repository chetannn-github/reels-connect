import {INSTAGRAM_APP_ID, INSTAGRAM_REDIRECT_URI } from '../../config/env.js';

export const getAuthURL = (req, res) => {
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

        return res.json({"redirectURL" :instagramAuthUrl});
    } catch (error) {
        console.log(error.message)
    }
};