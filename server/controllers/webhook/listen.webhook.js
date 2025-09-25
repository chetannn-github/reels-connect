import Chat from "../../models/chat.model.js";
import CommentAnalytics from "../../models/comment.analytics.model.js";
import Conversation from "../../models/conversation.model.js";
import { Reel, User } from "../../models/user.model.js";

import { FREE_USER_MESSAGES_LIMIT } from "../../utils/constant.js";
import { replyToComment, sendDMOnComment, sendPrivateReply } from "./utils.js";

export const listenWebhook = async(req, res) => {
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

          const comment = new CommentAnalytics({
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

      if(entry.messaging) {
        const senderID = entry.messaging[0]?.sender?.id;
        const recieverID = entry.messaging[0]?.recipient?.id;
        const message = entry.messaging[0]?.message?.text;

        if(!message) return;

        const user = await User.findOne({webhook_id : userID});
        if(!user) return;
        if(user.name === "pankaj gola") return;
      
        const token = user.access_token;

        let igUserId = senderID === userID ? recieverID : senderID;
        let conversation = await Conversation.findOne({
          igUserId,
          userId: user._id,
        });


        if (!conversation) {
          conversation = await Conversation.create({
            igUserId,
            userId: user._id,
            lastMessage: message,
          });
        } else {
          conversation.lastMessage = message;
          await conversation.save();
        }

        await Chat.create({
          conversationId: conversation._id,
          igUserId,
          userId: user._id,
          message,
          direction: senderID === userID ? "user_to_ig" : "ig_to_user",
        });


        if(userID === senderID) return;
        
        console.log("sender ID -> " + senderID)
        console.log("reciever ID -> " + recieverID);

        console.log(message) 
        await sendPrivateReply(userID,token,senderID,"Hello !!");
        user.messagesSent += 1;
        await user.save();
        
        
      }
    });
  } catch (err) {
    console.log("⚠️ Payload parsing error:", err.message);
  }
  return res.sendStatus(200);
  
}