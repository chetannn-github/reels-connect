import { WEBHOOK_VERIFY_TOKEN } from "../config/env.js";
import axios from "axios";
import { Reel, User } from "../models/user.model.js";
import commentAnalytics from "../models/comment.analytics.model.js";



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
          const commentText = change?.value?.text?.toLowerCase();
          const commentorUsername = change?.value?.from?.username;

          console.log("🆔 Comment ID:", comment_id);
          console.log("💬 New Comment:", commentText);

          let reel = await Reel.findOne({reelId : reel_id}).populate("user");

          if(!reel.isActive) return;

          const access_token = reel?.user?.access_token;
          const comment_reply = reel?.message || "";
          const keywords = reel?.keywords || [];

          const matchedKeyword = keywords.find(keyword => 
            commentText.includes(keyword.toLowerCase())
          );

  
          if(!matchedKeyword) return;
          await sendPrivateReply(userID,access_token,comment_id, comment_reply);
          
          let postOwner = await User.findById(reel?.user._id);
          postOwner.messagesSent += 1;
          await postOwner.save();

          const comment = new commentAnalytics({
            user: postOwner,
            reel,
            commentText,
            dmMessage : comment_reply,
            dmSent : true,
            commentor : commentorUsername
          });

          await comment.save();
        
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
