import express from 'express';
import { addIgAccount, getIgAccount } from '../controllers/ig.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', protect, addIgAccount);
router.get('/', protect, getIgAccount);

export default router;