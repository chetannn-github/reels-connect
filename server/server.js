import express from 'express';
import { PORT } from './config/env.js';
import { connectToDB } from './config/db.js';


const app = express();
app.use(express.json());




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