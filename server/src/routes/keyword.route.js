import express from 'express';
import {addKeywordAndMessage} from '../controllers/keyword.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, addKeywordAndMessage);


export default router;
