import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { me } from '../controllers/auth/me.js';

const router = express.Router();


router.get('/me', protect, me);

export default router;
