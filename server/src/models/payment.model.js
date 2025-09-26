import mongoose from 'mongoose';


const paymentSchema = new mongoose.Schema({
    amount : {type : Number, required : true},
    razorpay_order_id : { type: String, required : true },
    razorpay_payment_id : { type: String},
    razorpay_signature : { type: String},
    isVerified : {type : Boolean, default : false},
    date : { type: Date, default : Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);