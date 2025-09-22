import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getAnalytics } from '../controllers/analytics.controller.js';

const router = express.Router();


router.get('/', protect, getAnalytics);

export default router;
