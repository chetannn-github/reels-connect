import express from 'express';
import { getAllReels, addReel, updateReel, deleteReel } from '../controllers/reel.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getAllReels);
router.post('/add', protect, addReel);
router.put('/update/:id', protect, updateReel);
router.delete('/delete/:id', protect, deleteReel);

export default router;
