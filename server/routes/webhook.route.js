import express from "express";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook } from "../controllers/webhook.controller.js";

import bodyParser from "body-parser";
import xhub from "express-x-hub";
import { Reel, User } from "../models/user.model.js";
import axios from "axios";

const router = express.Router();
let received_updates = [];
console.log(APP_SECRET);
router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));
router.use(bodyParser.json());

// GET for verification
router.get("/", verifyWebhook);

router.post("/", async(req, res) => {
  // if (!req.isXHubValid()) {
  //   console.log("❌ Invalid Instagram signature");
  //   return res.sendStatus(401);
  // }

  try {
    const payload = req.body;
    payload.entry?.forEach((entry) => {
      const userID = entry.id;
      entry.changes?.forEach(async(change) => {

        console.log(change);
        if (change.field === "comments") {
          
          const commentID = change.value.id;
          const reelID = change.value.media.id;
          console.log("🆔 Comment ID:", commentID);
          console.log("💬 New Comment:", change.value.text);
          let reel = await Reel.findOne({reelId : reelID}).populate("user");
          const access_token = reel.user.access_token;
    
          // DM USER
          await sendPrivateReply(userID,access_token,commentID);
        }
      });
    });
  } catch (err) {
    console.log("⚠️ Payload parsing error:", err.message);
  }
  return res.sendStatus(200);
  
});




const sendPrivateReply = async(IG_USER_ID,ACCESS_TOKEN,COMMENT_ID) => {
  try {
    const response = await axios.post(
      `https://graph.instagram.com/${IG_USER_ID}/messages`,
      {
        recipient: { comment_id: COMMENT_ID },
        message: { text: "hello behenkeloddee this is automated messagee broo!! " },
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
