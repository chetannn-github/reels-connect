import { RAZORPAY_KEY_SECRET } from "../config/env.js";
import { RazorpayInstance } from "../config/razorpay.js"
import { Payment } from "../models/payment.model.js";
import { ALLOWED_PAID_PLANS, PRICING } from "../utils/constant.js";
import crypto from "crypto"


export const createOrder = async(req,res) => {
    const {plan} = req.body;

    if (!ALLOWED_PAID_PLANS.includes(plan)) {
    return res.status(400).json({ error: "Invalid plan selected" });
    }

    const amount = PRICING[plan];

    const orderRes = await RazorpayInstance.orders.create({
        amount,
        currency: "INR",
        receipt: `receipt#${Date.now()} ${Math.floor(Math.random() * 10)}`,
    })

    return res.json(orderRes)

}


export const verifyPayment = async(req,res) => { 
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expected_sign = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

        const isAuthentic = expected_sign === razorpay_signature;

        if (isAuthentic) {
        const payment = new Payment({
            razorpay_order_id,
            razorpay_signature,
            razorpay_payment_id,
        });
        await payment.save();

        return res.json({ message: "Payment successful", error: false });
} else {
  return res.json({ message: "Payment failed", error: true });
}

    } catch (error) {
        console.log(error);
        return res.json({message : error.message })
    }
}
