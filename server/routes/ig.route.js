import express from 'express';
import { addIgAccount, callbackIgAccount, refreshLongLivedToken } from '../controllers/ig.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/add', addIgAccount);             
router.get('/callback', callbackIgAccount);  

router.post('/refresh', protect, refreshLongLivedToken);

export default router;