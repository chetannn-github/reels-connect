import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createOrder } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/', protect, createOrder);


export default router;