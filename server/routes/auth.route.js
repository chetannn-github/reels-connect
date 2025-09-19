import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {User} from '../models/user.model.js';

const router = express.Router();


router.get('/me', protect, async(req, res) => {
    let user = await User.findById(req.user._id).select("-access_token")
    res.json(user);
});

export default router;
