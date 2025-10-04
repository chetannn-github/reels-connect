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


export const demoReels = [
  {
    id: 1,
    type: "reel",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=400&fit=crop",
    keyword: "motivation",
    link: "https://www.instagram.com/reel/example1"
  },
  {
    id: 2,
    type: "dm",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=400&fit=crop",
    keyword: "business",
    link: "https://www.instagram.com/businessaccount"
  },
  {
    id: 3,
    type: "reel",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=400&fit=crop",
    keyword: "team",
    link: "https://www.instagram.com/reel/example2"
  },
  {
    id: 4,
    type: "dm",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=400&fit=crop",
    keyword: "success",
    link: "https://www.instagram.com/successcoach"
  },
  {
    id: 5,
    type: "reel",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=400&fit=crop",
    keyword: "growth",
    link: "https://www.instagram.com/reel/example3"
  },
  {
    id: 6,
    type: "dm",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=400&fit=crop",
    keyword: "strategy",
    link: "https://www.instagram.com/strategyexpert"
  },
];