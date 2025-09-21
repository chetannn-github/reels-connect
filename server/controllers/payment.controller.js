import { RAZORPAY_KEY_SECRET, FRONTEND_BASEURL } from "../config/env.js";
import { RazorpayInstance } from "../config/razorpay.js"
import { Payment } from "../models/payment.model.js";
import {User } from "../models/user.model.js"

import { ALLOWED_PAID_PLANS, PRICE_TO_PLAN, PRICING } from "../utils/constant.js";
import crypto from "crypto"


export const createOrder = async(req,res) => {
    const user = req.user;

    const {plan} = req.body;

    if (!ALLOWED_PAID_PLANS.includes(plan)) {
        return res.status(400).json({ error: "Invalid plan selected" });
    }

    const amount = PRICING[plan];

    const orderRes = await RazorpayInstance.orders.create({
        amount : amount*100,
        currency: "INR",
        receipt: `receipt#${Date.now()} ${Math.floor(Math.random() * 10)}`,
    })

    const order_id = orderRes.id;
    const payment = new Payment({razorpay_order_id : order_id, user, amount})
    await payment.save();


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
            const payment = await Payment.findOne({razorpay_order_id});
            payment.razorpay_signature = razorpay_signature;
            payment.razorpay_payment_id = razorpay_payment_id;
            payment.isVerified = true;
            await payment.save();

            const user = await User.findById(payment.user);

            const amount = payment.amount;
            user.plan = PRICE_TO_PLAN[amount];
            user.plan_expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            user.payment = payment;
            await user.save();
            return res.json({ message: "Payment successful", error: false });
            
    } else {
    return res.json({ message: "Payment failed", error: true });
    }

    } catch (error) {
        console.log(error);
        return res.json({message : error.message })
    }
}
