import express from "express";
import xhub from "express-x-hub";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();

router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));

let received_updates = [];


router.get("/", verifyWebhook);


router.post("/", (req, res) => {
  console.log("📩 Instagram Webhook Event Received");

  // Signature validation
  if (!req.isXHubValid()) {
    console.log("❌ Invalid X-Hub-Signature-256");
    return res.sendStatus(401);
  }

  console.log("✅ Signature verified");
  console.log("Request body:", JSON.stringify(req.body, null, 2));

  // Save update for debugging
  received_updates.unshift(req.body);

  // Handle IG events (comments, mentions, etc.)
  req.body.entry?.forEach(entry => {
    entry.changes?.forEach(change => {
      if (change.field === "comments") {
        console.log("💬 New Comment:", change.value.text);
        console.log("👉 On Media ID:", change.value.media.id);
      }
    });
  });

  return res.sendStatus(200);
});

export default router;
