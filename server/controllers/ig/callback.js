import { FRONTEND_BASEURL, INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI} from '../../config/env.js';
import axios from "axios";
import qs from "qs"
import { User } from '../../models/user.model.js';
import { generateToken } from '../../utils/jwt.js';
import { getUserInfo } from './utils/userInfo.js';


// to do if callback fails with some reason then redirect to frontend /dashboard with some error 
export const handleCallBack = async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ message: 'Authorization code missing'});

    try {
        const data = qs.stringify({
            client_id: INSTAGRAM_APP_ID,
            client_secret: INSTAGRAM_APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: `${INSTAGRAM_REDIRECT_URI}`,
            code: code
        });

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        let response = await axios.post('https://api.instagram.com/oauth/access_token', data, config);
        const { access_token, user_id } = response.data;
        
        let isUserPreExists = false;
        let user = await User.findOne({user_id});
        if(!user) user = new User({user_id});
        else isUserPreExists = true;

        user.access_token = access_token;
        await user.save();
        
        console.log("getting long lived token ")
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


        console.log("getting user infoo")
        if(!isUserPreExists) await getUserInfo(user);
        res.redirect(`${FRONTEND_BASEURL}/ig-success?token=${jwtToken}`);

        // res.json({ message: 'your instagram account is successfully linked to us.', token: long_token, jwtToken , user});

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: error.response?.data || error.message });
    }
};