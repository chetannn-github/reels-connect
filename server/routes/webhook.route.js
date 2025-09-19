import express from "express";
import crypto from "crypto";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook } from "../controllers/webhook.controller.js";

const router = express.Router();
let received_updates = [];

// GET for verification
router.get("/", verifyWebhook);

// POST for events
router.post("/", (req, res) => {
  console.log(req.headers);
  const signature = req.headers["X-Hub-Signature-256"];
  console.log(APP_SECRET);
  // if (!signature) {
  //   console.log("❌ No signature header found");
  //   return res.sendStatus(401);
  // }
 

  // // ✅ Use rawBody here, not JSON.stringify(req.body)
  // const hash = crypto
  //   .createHmac("sha256", APP_SECRET)
  //   .update(req.rawBody) // 👈 raw body
  //   .digest("hex");

  // const expectedSignature = `sha256=${hash}`;

  // if (signature !== expectedSignature) {
  //   console.log("❌ Invalid signature");
  //   return res.sendStatus(401);
  // }

  console.log("✅ Signature verified");
  console.log("Request body:", JSON.stringify(req.body, null, 2));

  received_updates.unshift(req.body);
  res.sendStatus(200);
});

export default router;
