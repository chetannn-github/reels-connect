import express from 'express';
import { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI, PORT } from './config/env.js';
import { connectToDB } from './config/db.js';


import authRoutes from './routes/auth.route.js';
import igRoutes from './routes/ig.route.js';
import reelRoutes from './routes/reel.route.js';
import keywordRoutes from './routes/keyword.route.js';
import webhookRoutes from './routes/webhook.route.js';

const app = express();
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use('/api/ig', igRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/webhook', webhookRoutes);


app.get('/test', (req, res) => {
    return res.json('ReelConnect Backend is Running');
});

app.listen(PORT, async() => {
    try {
        await connectToDB();
        console.log(INSTAGRAM_APP_ID,INSTAGRAM_APP_SECRET,INSTAGRAM_REDIRECT_URI)
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log("error" + error.message);
    }
});