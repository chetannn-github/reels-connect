import { Reel, User } from "../../../models/user.model.js";
import { FREE_USER_MESSAGES_LIMIT } from "../../../utils/constant.js";
import CommentAnalytics from "../../../models/comment.analytics.model.js";
import { sendDM } from "./sendDM.js";
import { replyToComment } from "./replyToComment.js";
import { handlePremiumComment } from "./handlePremiumComment.js";

export const handleComment = async(webhookID, commentText, commentId, commentorUsername, reelId) => {
    let reel = await Reel.findOne({reelId}).populate("user");
    if(!reel) return ; // if it is not in db but comment can come
     
    let postOwner = await User.findById(reel?.user._id);
    if(postOwner.plan === "free" && postOwner.messagesSent >= FREE_USER_MESSAGES_LIMIT) return;
    if(commentorUsername === postOwner.username) return;
    if(!reel.isActive) return;

    const access_token = reel?.user?.access_token;
    const comment_reply = reel?.message || "";
    const keywords = reel?.keywords || [];

    const matchedKeyword = keywords.find(keyword => 
      commentText.includes(keyword.toLowerCase())
    );

    
    if(!matchedKeyword) {
      if(postOwner.plan !== "premium") return;
      else return await handlePremiumComment(reel,webhookID,commentText,commentId,commentorUsername)
    }
    

    await sendDM(webhookID,access_token,commentId, comment_reply, true);
    await replyToComment(commentId,"Check your DM 🔥", access_token);
    
    postOwner.messagesSent += 1;
    postOwner.webhook_id = webhookID;
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