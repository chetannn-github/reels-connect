import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { me, storeInfo} from '../controllers/auth/index.js';
import checkPremium from '../middlewares/premium.middleware.js';

const router = express.Router();


router.get('/me', protect, me);
router.post("/store-info", protect,checkPremium,storeInfo);

export default router;
