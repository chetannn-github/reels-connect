import express from "express";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook } from "../controllers/webhook.controller.js";

import bodyParser from "body-parser";
import xhub from "express-x-hub";
import { Reel, User } from "../models/user.model.js";
import axios from "axios";

const router = express.Router();

console.log(APP_SECRET);
router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));
router.use(bodyParser.json());


router.get("/", verifyWebhook);

router.post("/", async(req, res) => {
  try {
    const payload = req.body;
    payload.entry?.forEach((entry) => {
      const userID = entry.id;
      entry.changes?.forEach(async(change) => {

        console.log(change);
        if (change.field === "comments") {
          
          const comment_id = change?.value?.id;
          const reel_id = change?.value?.media?.id;
          const comment = change?.value?.text?.toLowerCase();

          console.log("🆔 Comment ID:", comment_id);
          console.log("💬 New Comment:", comment);

          let reel = await Reel.findOne({reelId : reel_id}).populate("user");
          const access_token = reel.user.access_token;
          const comment_message = reel.message;

          const keywords = reel.keywords;

          const matchedKeyword = keywords.find(keyword => 
            comment.includes(keyword.toLowerCase())
          );

          if(matchedKeyword) console.log("keyword matched broo")
          await sendPrivateReply(userID,access_token,comment_id, comment_message);
        }
      });
    });
  } catch (err) {
    console.log("⚠️ Payload parsing error:", err.message);
  }
  return res.sendStatus(200);
  
});




const sendPrivateReply = async(IG_USER_ID,ACCESS_TOKEN,COMMENT_ID,COMMENT_MESSAGE) => {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/${IG_USER_ID}/messages`,
      {
        recipient: { comment_id: COMMENT_ID },
        message: { text: COMMENT_MESSAGE },
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

export default router;
