import express from "express";
import xhub from "express-x-hub";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook } from "../controllers/webhook.controller.js";
import crypto from "crypto";

const router = express.Router();

router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));

let received_updates = [];


router.get("/", verifyWebhook);


router.post("/", (req, res) => {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.log("❌ No signature header found");
    return res.sendStatus(401);
  }

  const hash = crypto
    .createHmac("sha256", process.env.APP_SECRET)
    .update(JSON.stringify(req.body)) // 👈 dhyan do ki req.body raw ho
    .digest("hex");

  const expectedSignature = `sha256=${hash}`;

  if (signature !== expectedSignature) {
    console.log("❌ Invalid signature");
    return res.sendStatus(401);
  }

  console.log("✅ Signature verified");
  console.log("Request body:", JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

export default router;
