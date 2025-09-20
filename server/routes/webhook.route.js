import express from "express";
import bodyParser from "body-parser";
import xhub from "express-x-hub";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook ,listenWebhookAndDMOnKeywordMatch} from "../controllers/webhook.controller.js";





const router = express.Router();

router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));
router.use(bodyParser.json());


router.get("/", verifyWebhook);
router.post("/", listenWebhookAndDMOnKeywordMatch);


export default router;
