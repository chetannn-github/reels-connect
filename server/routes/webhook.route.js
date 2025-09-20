import express from "express";
import bodyParser from "body-parser";
import xhub from "express-x-hub";
import { APP_SECRET } from "../config/env.js";
import { verifyWebhook ,listenWebhookAndDMOnKeywordMatch, subscribeWebhook} from "../controllers/webhook.controller.js";
import { protect } from "../middlewares/auth.middleware.js";





const router = express.Router();

router.use(xhub({ algorithm: "sha256", secret: APP_SECRET }));
router.use(bodyParser.json());


router.get("/", verifyWebhook);
router.post("/", listenWebhookAndDMOnKeywordMatch);
router.post("/subscribe",protect,subscribeWebhook)


export default router;
