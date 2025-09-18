import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }

        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGM2YmNiMDRkYWUwNzczOTAzODIyMDgiLCJpYXQiOjE3NTc5NDkxMDEsImV4cCI6MTc1ODU1MzkwMX0.fnvPXBGF_BhUN-KletZuaZBNjoSI0jQyLY8qB4f5w3I";
        // const decoded = jwt.verify(token, JWT_SECRET);
        


        const user = await User.findById("68cbf6d4ba59a1ee94320e56").select('-passwordHash');

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


client_id=1116520140680050&client_secret=51254aab5e1b99bb03748d688b2b5fee&grant_type=authorization_code&redirect_uri=https%3A%2F%2Freels-connect.onrender.com%2Fapi%2Fig%2Fcallback&code=AQD7W2ePXlwQiTmFSGvrMPI-2mUqCR2Bw8ERaVSkOj6obkd4PcSv1OWluHFgU7bg_WlgMSqHQded8QL3as4mHajpp759ULUiTTQIVL8toTHzFs0F8tQhwsQIEA6-73QbkzKy_b862g2yqy4aKKj-qGIaVtsvQDQIijTt05HWbd14pVpAbJYPrsqGusB5uNY2RWEcurKNDjjS-QhAVNJQJcX3X2jcCgyWPljOHreq6_stdA
