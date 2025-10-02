import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Star, Crown, Zap} from "lucide-react";
import { Instagram, Target, Hash } from "lucide-react";
import { Bot, TrendingUp, Shield, Clock, BarChart3, MessageCircle } from "lucide-react";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(str) {
  try {
    new URL(str);
    return true; 
  } catch (err) {
    return false;
  }
}


export const plans = [
  {
    type: "free",
    name: "Free",
    icon: Zap,
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "upto 1 reel automation",
      "20 automated messages",
      "Automated replies to reel comments",
      "Basic templates",
      "Email support",
      "Limited analytics",
    ],
    buttonText: "Start Free",
    buttonVariant: "outline",
    buttonLoadingText: "Starting...",
    popular: false,
    disabled: false,
  },
  {
    type: "basic",
    name: "Pro",
    icon: Star,
    price: "₹1000",
    period: "per month",
    description: "For serious content creators",
    features: [
      "Up to 30 reels automation",
      "Advanced keyword targeting",
      "Automated comment replies",
      "Premium templates",
      "Priority support",
      "Advanced analytics",
    ],
    buttonText: "Get Pro",
    buttonVariant: "hero",
    buttonLoadingText: "Processing...",
    popular: true,
  },
  {
    type: "premium",
    name: "AI Pro",
    icon: Crown,
    price: "₹2500",
    period: "per month",
    description: "AI-powered automation ",
    features: [
      "Unlimited reel automation",
      "AI-powered content creation",
      "Smart keyword research",
      "Custom AI chatbot for DMs",
      "Premium templates",
      "Priority support",
      "Advanced analytics",
    ],
    buttonText: "Get AI Pro",
    buttonVariant: "outline",
    buttonLoadingText: "Processing....",
    popular: false,
  },
];

export const steps = [
    {
      icon: Instagram,
      title: "Connect Instagram",
      description: "Securely link your Instagram account in seconds",
      time: "30 seconds",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Target,
      title: "Select Reels",
      description: "Choose which type of reels you want to automate",
      time: "1 minute",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Hash,
      title: "Add Keywords",
      description: "Set your target keywords and content preferences",
      time: "2 minutes",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Zap,
      title: "Automation Ready",
      description: "Sit back and watch your reels go viral automatically",
      time: "Instant",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
];


export const features = [
  {
    icon: Bot,
    title: "AI-Powered Content",
    description:
      "Advanced AI creates engaging reels tailored to your keywords and audience preferences",
    color: "text-primary",
    bgColor: "bg-primary/10",
    comingSoon: true, // abhi "coming soon"
  },
  {
    icon: TrendingUp,
    title: "Viral Optimization",
    description:
      "Algorithm-optimized posting times and hashtag strategies to maximize your reach",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description:
      "Bank-level security with Instagram-compliant automation that won't risk your account",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights into performance, growth metrics, and ROI tracking for your content",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    title: "DM Automation",
    description:
      "Intelligent chatbot handles Instagram DMs, converts followers to customers automatically",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];