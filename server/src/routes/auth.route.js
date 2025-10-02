import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { me, storeInfo} from '../controllers/auth/index.js';
import checkPremium from '../middlewares/premium.middleware.js';
import uploadPDF from '../middlewares/uploadPDF.middleware.js';

const router = express.Router();


router.get('/me', protect, me);
router.post("/store-info", protect,uploadPDF.array("files"),storeInfo);

export default router;
