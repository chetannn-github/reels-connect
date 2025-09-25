import { WEBHOOK_VERIFY_TOKEN } from "../config/env.js";
import axios from "axios";
import { Reel, User } from "../models/user.model.js";
import commentAnalytics from "../models/comment.analytics.model.js";
import { FREE_USER_MESSAGES_LIMIT } from "../utils/constant.js";
import Conversation from "../models/conversation.model.js";
import Chat from "../models/chat.model.js";



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
    payload.entry?.forEach(async (entry) => {
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

          if(!reel) return ; // if it is not in db but comment can come
          let postOwner = await User.findById(reel?.user._id);

          if(postOwner.plan === "free" && postOwner.messagesSent >= FREE_USER_MESSAGES_LIMIT) return;
          if(!reel.isActive) return;

          const access_token = reel?.user?.access_token;
          const comment_reply = reel?.message || "";
          const keywords = reel?.keywords || [];

          const matchedKeyword = keywords.find(keyword => 
            commentText.includes(keyword.toLowerCase())
          );

          
          if(!matchedKeyword) return;
          await sendDMOnComment(userID,access_token,comment_id, comment_reply);
          await replyToComment(comment_id,"Check your DM 🔥", access_token);
          
          postOwner.messagesSent += 1;
          postOwner.webhook_id = userID;
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
        
      });

      // if(entry.messaging) {
      //   const senderID = entry.messaging[0]?.sender?.id;
      //   const recieverID = entry.messaging[0]?.recipient?.id;
      //   const message = entry.messaging[0]?.message?.text;

      //   if(!message) return;

      //   const user = await User.findOne({webhook_id : userID});
      //   if(!user) return;
      //   const token = user.access_token;

      //   let igUserId = senderID === userID ? recieverID : senderID;
      //   let conversation = await Conversation.findOne({
      //     igUserId,
      //     userId: user._id,
      //   });


      //   if (!conversation) {
      //     conversation = await Conversation.create({
      //       igUserId,
      //       userId: user._id,
      //       lastMessage: message,
      //     });
      //   } else {
      //     conversation.lastMessage = message;
      //     await conversation.save();
      //   }

      //   await Chat.create({
      //     conversationId: conversation._id,
      //     igUserId,
      //     userId: user._id,
      //     message,
      //     direction: senderID === userID ? "user_to_ig" : "ig_to_user",
      //   });


      //   if(userID === senderID) return;
        
      //   console.log("sender ID -> " + senderID)
      //   console.log("reciever ID -> " + recieverID);

      //   console.log(message) 
      //   await sendPrivateReply(userID,token,senderID,"Hello !!");
      //   user.messagesSent += 1;
      //   await user.save();
        
        
      // }
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



const sendPrivateReply = async(IG_USER_ID,ACCESS_TOKEN,RECIEVER_ID,DM_MESSAGE) => {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/${IG_USER_ID}/messages`,
      {
        recipient: { id: RECIEVER_ID },
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


const sendDMOnComment = async(IG_USER_ID,ACCESS_TOKEN,COMMENT_ID,DM_MESSAGE) => {
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



export async function replyToComment(commentId, message, accessToken) {
  try {
    const url = `https://graph.instagram.com/v23.0/${commentId}/replies`;

    const response = await axios.post(url, null, {
      params: {
        message,
        access_token: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error replying to comment:", error.response?.data || error.message);
    throw error;
  }
}
