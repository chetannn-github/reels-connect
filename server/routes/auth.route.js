
import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', protect, (req, res) => {
    res.json({ user: req.user });
});

export default router;
