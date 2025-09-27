import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { me } from '../controllers/auth/me.js';
import checkPremium from '../middlewares/premium.middleware.js';
import { userInfo } from '../controllers/auth/userInfo.js';

const router = express.Router();


router.get('/me', protect, me);
router.post("/store-info", protect,checkPremium,userInfo);

export default router;
