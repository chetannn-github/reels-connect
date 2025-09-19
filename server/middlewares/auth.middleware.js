import jwt from 'jsonwebtoken';
import { JWT_SECRET, VERIFY_TOKEN } from '../config/env.js';
import User from '../models/user.model.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ message: "No token provided" });
        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Invalid token format" });

        const decoded = verifyToken(token);
        const user = await User.findOne({ user_id: decoded.user_id });


        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized' });
    }
};

