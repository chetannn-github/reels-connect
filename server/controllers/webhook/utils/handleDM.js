import Chat from "../../../models/chat.model.js";
import Conversation from "../../../models/conversation.model.js";
import { User } from "../../../models/user.model.js";

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
            
            console.log("sender ID -> " + senderID)
            console.log("reciever ID -> " + recieverID);
    
            console.log(message) 
            await sendPrivateReply(webhookID,token,senderID,"Hello !!");
            user.messagesSent += 1;
            await user.save();
}