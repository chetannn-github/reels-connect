import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

export async function connectToDB() {
    await mongoose.connect(MONGO_URI);
    console.log("connect to mongodb")
}
