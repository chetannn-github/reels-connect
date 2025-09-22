export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;


export const sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
};


export const PLAN_TO_LABEL = {
  "basic" : "Pro",
  "premium" : "AI Pro",
  "free" : "Free"
}


export const getPlanIndex = (plan) => {
  if(plan === null) return -1;
  if(plan == "basic") return 1;
  if(plan == "free") return 0;
  if(plan == "premium") return 2;
}