import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;


export const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID;
export const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
export const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
export const INSTAGRAM_REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
