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
    image: "https://scontent-arn2-1.cdninstagram.com/v/t51.71878-15/552031907_649461284550516_5868858825686982101_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=1-7&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=K27KrEq7cdAQ7kNvwELsX2Y&_nc_oc=AdmBfyHBnVYioMKzZkOPuCKmuJ90pQDAtD2C_fEvyenU9Ks7xlgYU8IQpwDWPBbcIZw&_nc_zt=23&_nc_ht=scontent-arn2-1.cdninstagram.com&edm=ANo9K5cEAAAA&_nc_gid=I0G1TQe0FsRKdCcW_Okpjw&oh=00_AfcDaueX-EwKFKMNxya8KzFoeA43wt3PfVhtsC4plyPrhA&oe=68E6B087",
    keyword: "pdf",
    link: "https://www.instagram.com/p/DO70aZjAR-b/"
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