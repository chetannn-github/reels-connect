import express from 'express';
import { verifyWebhook, handleEvent } from '../controllers/webhook.controller.js';

const router = express.Router();

router.get('/', verifyWebhook);
router.post('/', handleEvent);

export default router;
