import express from 'express';
import { addIgAccount, callbackIgAccount, getLongLivedToken, refreshLongLivedToken } from '../controllers/ig.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/add', protect, addIgAccount);             
router.get('/callback', protect, callbackIgAccount);   // Handle Instagram callback
router.post('/long-lived', protect, getLongLivedToken); // Exchange token for long-lived token
router.post('/refresh', protect, refreshLongLivedToken); // Refresh long-lived token

export default router;