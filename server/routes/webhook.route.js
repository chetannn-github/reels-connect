import express from "express";
import xhub from "express-x-hub";

const router = express.Router();

// Add express-x-hub middleware
// Use sha256 because Instagram sends X-Hub-Signature-256
router.use(
  xhub({ algorithm: "sha256", secret: process.env.APP_SECRET })
);

// ✅ Store received events (optional for debugging)
let received_updates = [];

// --------------------
// Verification Endpoint
// --------------------
router.get("/", (req, res) => {
  const VERIFY_TOKEN = process.env.TOKEN || "token";
  console.log(VERIFY_TOKEN);

  console.log(req.query);

  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === VERIFY_TOKEN
  ) {
    console.log("✅ Webhook verified successfully!");
    return res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.log("❌ Verification failed");
    return res.sendStatus(400);
  }
});

// --------------------
// Event Notification Endpoint
// --------------------
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
