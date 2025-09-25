import { handleComment } from "./utils/handleComment.js";
import { handleDM } from "./utils/handleDM.js";

export const listenWebhook = async(req, res) => {
  try {
    const payload = req.body;
    payload.entry?.forEach(async (entry) => {
      const webhookID = entry.id;

      entry.changes?.forEach(async(change) => {
        if (change.field === "comments") {
          const comment_id = change?.value?.id;
          const reel_id = change?.value?.media?.id;
          const commentText = change?.value?.text?.toLowerCase();
          const commentorUsername = change?.value?.from?.username;
          await handleComment(webhookID, commentText, comment_id, commentorUsername, reel_id)
        }
        
      });

      if(entry.messaging) {
        const senderID = entry.messaging[0]?.sender?.id;
        const recieverID = entry.messaging[0]?.recipient?.id;
        const message = entry.messaging[0]?.message?.text;

        if(!message) return;
        await handleDM(webhookID,senderID,recieverID,message);
      }
    });
  } catch (err) {
    console.log("⚠️ Payload parsing error:", err.message);
  }
  return res.sendStatus(200);
  
}