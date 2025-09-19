import { WEBHOOK_VERIFY_TOKEN } from "../config/env.js";

export const verifyWebhook = (req, res) => {
    const VERIFY_TOKEN = WEBHOOK_VERIFY_TOKEN || "meatyhamhock";
    
    if (req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === VERIFY_TOKEN) {
        console.log("Webhook verified successfully!");
        return res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.log("Verification failed");
        return res.sendStatus(400);
    }
}