import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
    reelId: { type: String, required: true },
    reelTitle: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    keywords: [{ type: String }],
    message: { type: String }
});

const igAccountSchema = new mongoose.Schema({
    accountId: { type: String, required: true },
    username: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    reels: [reelSchema]
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    igAccount: { type: igAccountSchema, default: null }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
