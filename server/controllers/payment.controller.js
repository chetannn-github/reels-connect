import { RazorpayInstance } from "../config/razorpay.js"
import { ALLOWED_PAID_PLANS, PRICING } from "../utils/constant.js";



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