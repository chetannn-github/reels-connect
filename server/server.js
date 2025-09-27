import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import { PORT } from './src/config/env.js';
import { connectToDB } from './src/config/db.js';
import cors from "cors";

import authRoutes from './src/routes/auth.route.js';
import igRoutes from './src/routes/ig.route.js';
import keywordRoutes from './src/routes/keyword.route.js';
import webhookRoutes from './src/routes/webhook.route.js';
import paymentRoutes from './src/routes/payment.route.js'
import analyticsRoutes from './src/routes/analytics.route.js'

import './src/cron/refreshToken.cron.js'


const app = express();

app.use(
  cors({
    origin: ["https://reel-connect.onrender.com", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use('/api/webhook', webhookRoutes);

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use('/api/ig', igRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/analytics', analyticsRoutes)



app.get('/test', (req, res) => {
    return res.json('ReelConnect Backend is Running');
});

app.listen(PORT, async() => {
    try {
        await connectToDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log("error" + error.message);
    }
});