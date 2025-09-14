import express from 'express';
import { getKeywords, addKeyword, updateKeyword, deleteKeyword } from '../controllers/keyword.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:reelId', protect, getKeywords);
router.post('/add/:reelId', protect, addKeyword);
router.put('/update/:reelId/:keywordId', protect, updateKeyword);
router.delete('/delete/:reelId/:keywordId', protect, deleteKeyword);

export default router;
