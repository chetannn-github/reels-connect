import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;


export const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID;
export const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
export const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
export const INSTAGRAM_REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI;
export const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

export const APP_SECRET = process.env.APP_SECRET;
export const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN


// export const FRONTEND_BASEURL = "http://localhost:5173" ;
export const FRONTEND_BASEURL =  "https://reel-connect.onrender.com"; 


export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;