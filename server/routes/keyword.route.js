import express from 'express';
import {addKeyword} from '../controllers/keyword.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, addKeyword);


export default router;
