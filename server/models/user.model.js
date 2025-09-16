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
    username: { type: String},       // Instagram username
    access_token: { type: String, required: true },
    refresh_token: { type: String },  // Short or long-lived access token
    expires_in: { type: Number },                    // Token expiration period          
                                 // Reels associated with this account
},{ _id: false });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    instagram: { type: igAccountSchema, default: null },
    reels: [reelSchema] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
