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

const app = express();

app.use(
  cors({
    origin: ["https://reel-connect.onrender.com", "http://localhost:5173", "https://instaconnector.in"],
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

app.listen(PORT, async() => {
    try {
        await connectToDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log("error" + error.message);
    }
});