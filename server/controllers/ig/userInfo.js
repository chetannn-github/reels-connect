import axios from "axios";

export const getUserInfo = async (user) => {
     const userInfoRes = await axios.get(`https://graph.instagram.com/v23.0/me`, {
            params: {
                fields: "id,username,followers_count,name,profile_picture_url,media_count",
                access_token: user.access_token,
            },
        });

        // console.log(userInfoRes?.data)

        const {username, followers_count, name, profile_picture_url, media_count } =userInfoRes?.data;
        user.username = username;
        user.followers = followers_count;
        user.name = name;
        user.profileURL = profile_picture_url;
        user.postCount = media_count;
        await user.save();

}