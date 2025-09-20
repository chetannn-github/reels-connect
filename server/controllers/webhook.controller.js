import { WEBHOOK_VERIFY_TOKEN } from "../config/env.js";
import axios from "axios";
import { Reel } from "../models/user.model.js";



export const verifyWebhook = (req, res) => {
    const VERIFY_TOKEN = WEBHOOK_VERIFY_TOKEN || "meatyhamhock";
    
    if (req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === VERIFY_TOKEN) {
        console.log("Webhook verified successfully!");
        return res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.log("Verification failed");
        return res.sendStatus(400);
    }
}



export const listenWebhookAndDMOnKeywordMatch = async(req, res) => {
  try {
    const payload = req.body;
    payload.entry?.forEach((entry) => {
      const userID = entry.id;
      entry.changes?.forEach(async(change) => {
        
        if (change.field === "comments") {
          
          const comment_id = change?.value?.id;
          const reel_id = change?.value?.media?.id;
          const comment = change?.value?.text?.toLowerCase();

          console.log("🆔 Comment ID:", comment_id);
          console.log("💬 New Comment:", comment);

          let reel = await Reel.findOne({reelId : reel_id}).populate("user");
          const access_token = reel?.user?.access_token;
          const comment_reply = reel?.message || "";

          const keywords = reel?.keywords || [];

          const matchedKeyword = keywords.find(keyword => 
            comment.includes(keyword.toLowerCase())
          );

          // !TODO if keyword then only send message and if reel is isActive
          if(matchedKeyword) console.log("keyword matched broo")
          await sendPrivateReply(userID,access_token,comment_id, comment_reply);
        
        }
        
        else if(change.field === "messages") {
          const incomingMessage = change?.value?.message?.text;
          console.log("Incoming Message -> " + incomingMessage);
          // await sendPrivateReply(userID,access_token,)
        }else {
          console.log(change);
        }
      });
    });
  } catch (err) {
    console.log("⚠️ Payload parsing error:", err.message);
  }
  return res.sendStatus(200);
  
}


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



const sendPrivateReply = async(IG_USER_ID,ACCESS_TOKEN,COMMENT_ID,DM_MESSAGE) => {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/${IG_USER_ID}/messages`,
      {
        recipient: { comment_id: COMMENT_ID },
        message: { text: DM_MESSAGE },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    console.log("✅ Private reply sent:", response.data);
  } catch (error) {
    console.error("❌ Error sending private reply:", error.response?.data || error.message);
  }
}
