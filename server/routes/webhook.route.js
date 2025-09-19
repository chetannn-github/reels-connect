import express from "express";
import crypto from "crypto";

const router = express.Router();

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN; // apna secret string
const APP_SECRET = process.env.APP_SECRET; // Meta App secret


router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
});

// ✅ POST: Event Notification
router.post("/", express.json({ type: "application/json" }), (req, res) => {
  const signature = req.headers["x-hub-signature-256"];

  if (!verifySignature(req.body, signature)) {
    return res.status(401).send("Invalid signature");
  }

  console.log("📩 Webhook Event Received:", JSON.stringify(req.body, null, 2));

  // Example: handle Instagram comments
  req.body.entry?.forEach((entry) => {
    entry.changes?.forEach((change) => {
      if (change.field === "comments") {
        console.log("💬 New Comment:", change.value);
      }
    });
  });

  res.sendStatus(200); // Must respond quickly
});

// Helper to verify payload signature
function verifySignature(payload, signatureHeader) {
  if (!signatureHeader) return false;

  const expectedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", APP_SECRET)
      .update(JSON.stringify(payload))
      .digest("hex");

  return expectedSignature === signatureHeader.split("=")[1];
}

export default router;
