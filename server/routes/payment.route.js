import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createOrder, verifyPayment } from '../controllers/payment/index.js';

const router = express.Router();

router.post('/order', protect, createOrder);
router.post('/verify',verifyPayment)


export default router;