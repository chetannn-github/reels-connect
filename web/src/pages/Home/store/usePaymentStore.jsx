import { create } from "zustand";
import api from "../../../lib/api";
import { sleep } from "../../../lib/constant";
import { RAZORPAY_KEY_ID } from "../../../lib/constant";

const usePaymentStore = create((set, get) => ({
  isLoading: null,

  setIsLoading: (val) => set({ isLoading: val }),

  createOrder: async (planType, navigate) => {
    const { isLoading, setIsLoading, handlePaymentAndVerify } = get();
    if (isLoading) return;
    try {
      setIsLoading(planType);
      await sleep(0.8);

      if (planType === "free") {
        navigate("/dashboard");
        return;
      }

      const token = localStorage.getItem("jwt");
      if (!token) return navigate("/");

      const orderRes = await api.post("/payment/order", { plan: planType }, token);

      await handlePaymentAndVerify(orderRes, navigate);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(null);
    }
  },

  handlePaymentAndVerify: async (order, navigate) => {
    const { setIsLoading } = get();

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Reels - Connect",
      description: "Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const res = await api.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          console.log(res.message);

          if (!res.error) {
            localStorage.setItem("firework", "true");
            navigate("/dashboard");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(null);
        }
      },
    };

    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  },

  handleIGAuth: async (planType) => {
    const { isLoading, setIsLoading } = get();
    if (isLoading) return;

    try {
      setIsLoading(planType);
      await sleep(1);
      const { redirectURL } = await api.get("/ig/add");
      window.location.href = redirectURL;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(null);
    }
  },
}));

export default usePaymentStore;
