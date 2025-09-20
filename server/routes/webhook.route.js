import express from "express";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook } from "../controllers/webhook.controller.js";

import bodyParser from "body-parser";
import xhub from "express-x-hub";

const router = express.Router();
let received_updates = [];

router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));

// Use raw body parser ONLY for POST requests
router.use(bodyParser.raw({ type: "application/json" }));

// GET for verification
router.get("/", verifyWebhook);

router.post("/", (req, res) => {
  // if (!req.isXHubValid()) {
  //   console.log("❌ Invalid Instagram signature");
  //   return res.sendStatus(401);
  // }

  console.log("✅ Instagram signature verified");
  console.log("Request body:", req.body.toString());

  // Save updates for debugging
  received_updates.unshift(req.body.toString());

  // Example: handle IG comments
  try {
    const payload = JSON.parse(req.body.toString());
    payload.entry?.forEach((entry) => {
      entry.changes?.forEach((change) => {
        if (change.field === "comments") {
          console.log("💬 New Comment:", change.value.text);
          console.log("👉 On Media ID:", change.value.media.id);
        }
      });
    });
  } catch (err) {
    console.log("⚠️ Payload parsing error:", err.message);
  }

  return res.sendStatus(200);
});

export default router;
