import { Reel, User } from "../../../models/user.model.js";
import { FREE_USER_MESSAGES_LIMIT } from "../../../utils/constant.js";
import CommentAnalytics from "../../../models/comment.analytics.model.js";
import { sendDM } from "./sendDM.js";
import { replyToComment } from "./replyToComment.js";
import { handlePremiumComment } from "./handlePremiumComment.js";
import { handlePremiumCommentv2 } from "./handlePremiumCommentv2.js";
import { getCommentResponse } from "./getCommentResponse.js";

export const handleComment = async(webhookID, commentText, commentId, commentorUsername, reelId) => {
    let reel = await Reel.findOne({reelId}).populate("user");
    if(!reel) return ;
     
    let postOwner = await User.findById(reel?.user._id);
    console.log(postOwner.webhook_id);
    
      postOwner.webhook_id = webhookID;
      await postOwner.save();
    
    if(postOwner.plan === "free" && postOwner.messagesSent >= FREE_USER_MESSAGES_LIMIT) return;
    if(commentorUsername === postOwner.username) return;

    const autoResponse = await getCommentResponse(reel,commentText);
    const access_token = reel?.user?.access_token;

    if (autoResponse !== null) {
      const { type, message, commentReply, card } = autoResponse; 

      if (type === "card" || type === "text") {
        const dmMessage =  type === "card" ? card : message;
        await sendDM(webhookID,access_token, commentId, dmMessage, true);
        postOwner.messagesSent += 1;
        await postOwner.save();

        const comment = new CommentAnalytics({
          user: postOwner,
          reel,
          commentText,
          dmMessage : type === "card" ? "card" : dmMessage,
          dmSent : true,
          commentor : commentorUsername
        });
        await comment.save();

      }
      await replyToComment(commentId, commentReply, access_token);
    } else {
      if (postOwner.plan === "premium") await handlePremiumCommentv2(reel,webhookID,commentText,commentId,commentorUsername)
    }      
}