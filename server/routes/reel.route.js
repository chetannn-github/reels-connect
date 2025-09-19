import express from 'express';
import { getAllReels, updateReelStatus } from '../controllers/reel.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getAllReels);
router.put('/', protect, updateReelStatus);


export default router;
