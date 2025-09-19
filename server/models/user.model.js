import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
    reelId: { type: String, required: true },
    reelTitle: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    keywords: [{ type: String }],
    message: { type: String }
});



const userSchema = new mongoose.Schema({
    name : {type: String, default : ""},
    profileURL : {type: String, default : ""},
    username : {type: String, default : ""},
    followers :{type : Number , default : 0},
    user_id: { type: String, required: true },
    access_token: { type: String, required: true },
    reels: [reelSchema] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
