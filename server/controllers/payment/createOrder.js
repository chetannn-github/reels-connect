import { RazorpayInstance } from "../../config/razorpay.js"
import { Payment } from "../../models/payment.model.js";
import { ALLOWED_PAID_PLANS, PRICING } from "../../utils/constant.js";



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