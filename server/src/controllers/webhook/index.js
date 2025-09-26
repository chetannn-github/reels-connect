import axios from "axios";
import { verifyWebhook } from "./verify.webhook.js";
import { listenWebhook } from "./listen.webhook.js";


export {verifyWebhook,listenWebhook};


export const subscribeWebhook = async(req,res) => {
  let user_id = req.user?.user_id;
  const access_token = req.user?.access_token;

  console.log(access_token)

  try {
    const response = await axios.post(
      `https://graph.instagram.com/v23.0/${user_id}/subscribed_apps`,null,
      {
        params: {
          subscribed_fields: "comments",
          access_token
        },
      }
  );

  // console.log("Subscribed successfully:", response.data);
} catch (error) {
  console.error("❌ Error subscribing to webhook fields:", error.response?.data || error.message);
}
  return res.json({message : "subscribed"})
}



