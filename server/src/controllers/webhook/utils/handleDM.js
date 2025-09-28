import Chat from "../../../models/chat.model.js";
import Conversation from "../../../models/conversation.model.js";
import { User } from "../../../models/user.model.js";
import { getAutoDMResponse } from "./getAutoDMResponse.js";
import { handlePremiumDM } from "./handlePremiumDM.js";
import { sendDM } from "./sendDM.js";


export const handleDM = async (webhookID,senderID,recieverID,message) => {
    const user = await User.findOne({webhook_id : webhookID});
    if(!user) return;
    if(user.name === "pankaj gola") return;
  
    const token = user.access_token;

    let igUserId = senderID === webhookID ? recieverID : senderID;
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
      direction: senderID === webhookID ? "user_to_ig" : "ig_to_user",
    });


    if(webhookID === senderID) return;
    console.log("Incoming msg " + message) 

    const replyMessage = await getAutoDMResponse(user._id, message);
    if(replyMessage !== null) {
      const {type, card, message} = replyMessage;

      if(type === "card") {
        await sendDM(webhookID,token, senderID,card, false);
      } else await sendDM(webhookID,token,senderID,message, false);
      user.messagesSent += 1;
      await user.save();
      return;
    }
    if(user.plan === "premium") return await handlePremiumDM(user,senderID,message, conversation, webhookID);
}