import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import { PORT } from './src/config/env.js';
import { connectToDB } from './src/config/db.js';
import cors from "cors";

import authRoutes from './src/routes/auth.route.js';
import igRoutes from './src/routes/ig.route.js';
import commentAutomationRoutes from './src/routes/commentAutomation.route.js';
import webhookRoutes from './src/routes/webhook.route.js';
import paymentRoutes from './src/routes/payment.route.js';
import analyticsRoutes from './src/routes/analytics.route.js';
import instructionRoutes from './src/routes/instruction.route.js'
import dmAutomationRoutes from './src/routes/dmAutomation.route.js'
import './src/cron/refreshToken.cron.js'
import cloudinary from './src/config/cloudinary.js';

import multer from "multer";
import streamifier from "streamifier";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });
app.use(
  cors({
    origin: ["https://reel-connect.onrender.com", "http://localhost:5173", "https://www.instaconnector.in", "https://instaconnector.vercel.app"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use('/api/webhook', webhookRoutes);
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use('/api/ig', igRoutes);
app.use('/api/comment-automation', commentAutomationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/instruction', instructionRoutes);
app.use('/api/dm-automation', dmAutomationRoutes);
app.get('/test', (req, res) => res.json('ReelConnect Backend is Running'));

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file" });

    const buffer = req.file.buffer;

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "reels-connecr" }, 
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(buffer);
    return res.json({ success: true, url: result.secure_url});
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

app.listen(PORT, async() => {
    try {
        await connectToDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log("error" + error.message);
    }
});