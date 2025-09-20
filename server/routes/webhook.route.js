import express from "express";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook } from "../controllers/webhook.controller.js";

import bodyParser from "body-parser";
import xhub from "express-x-hub";

const router = express.Router();
let received_updates = [];
console.log(APP_SECRET);
router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));
router.use(bodyParser.json());

// GET for verification
router.get("/", verifyWebhook);

router.post("/", (req, res) => {
  // if (!req.isXHubValid()) {
  //   console.log("❌ Invalid Instagram signature");
  //   return res.sendStatus(401);
  // }



  try {
    const payload = req.body;
    payload.entry?.forEach((entry) => {
      entry.changes?.forEach((change) => {
        if (change.field === "comments") {
          console.log("💬 New Comment:", change.value.text);
          console.log(change);
          console.log("from --> " , change.value.from);
          const commentId = change.value.id;
          console.log("🆔 Comment ID:", commentId);
        }
      });
    });
  } catch (err) {
    console.log("⚠️ Payload parsing error:", err.message);
  }
  return res.sendStatus(200);
  
});

export default router;
