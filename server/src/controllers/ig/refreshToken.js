import axios from "axios";

export const refreshLongLivedToken = async (user) => {
    const access_token  = user.access_token;

    try {
        const response = await axios.get('https://graph.instagram.com/refresh_access_token', {
            params: {
                grant_type: 'ig_refresh_token',
                access_token: access_token
            }
        });

        const { access_token: new_token} = response.data;

        user.access_token = new_token;
        await user.save();
        console.log("token refreshed for" + user.name);
        
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};