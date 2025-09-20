import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
    reelId: { type: String, required: true },
    reelTitle: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    keywords: [{ type: String }],
    message: { type: String , default : "Hello this is an automated message from reels-connect" },
    mediaURL : { type : String, default : "" },
    timestamp : { type : String, default : "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Reel = mongoose.model('Reel', reelSchema);


const userSchema = new mongoose.Schema({
    name : { type: String, default : "" },
    profileURL : { type: String, default : "" },
    username : { type: String, default : "" },
    followers : { type : Number , default : 0 },
    user_id: { type: String, required: true },
    access_token: { type: String, required: true },
    postCount : { type : Number, default : 0 },
    reels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reel" }] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export { User, Reel };
