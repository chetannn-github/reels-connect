import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
    reelId: { type: String, required: true },
    reelTitle: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    keywords: [{ type: String }],
    message: { type: String }
});

const igAccountSchema = new mongoose.Schema({
    user_id: { type: String, required: true },        // Instagram user ID
    username: { type: String, required: true },       // Instagram username
    access_token: { type: String, required: true },   // Short or long-lived access token
    expires_in: { type: Number },                    // Token expiration period
    permissions: [{ type: String }],                 // List of granted permissions
    reels: [reelSchema]                              // Reels associated with this account
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    igAccount: { type: igAccountSchema, default: null }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
