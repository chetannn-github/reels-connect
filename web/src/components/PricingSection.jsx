import { Button } from "./ui/Button";
import { Check, Star, Crown, Zap } from "lucide-react";
import api from "../lib/api"
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();
  const plans = [
    {
      type : "free",
      name: "Free",
      icon: Zap,
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 reel automation based on keywords",
        "Automated replies to reel comments",
        "Basic templates",
        "Email support",
        "Instagram analytics",
      ],
      buttonText: "Start Free",
      buttonVariant: "outline",
      popular: false,
      disabled: false,
    },
    {
      type : "basic",
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
        "Custom scheduling",
      ],
      buttonText: "Get Pro",
      buttonVariant: "hero",
      popular: true,
      disabled: false,
    },
    {
      type : "premium",
      name: "AI Pro",
      icon: Crown,
      price: "₹2500",
      period: "per month",
      description: "AI-powered automation (Coming Soon)",
      features: [
        "Unlimited reel automation",
        "AI-powered content creation",
        "Smart keyword research",
        "Custom AI chatbot for DMs",
        "Advanced automation rules",
        "Dedicated account manager",
        "White-label solution",
        "API access",
      ],
      buttonText: "Coming Soon",
      buttonVariant: "outline",
      popular: false,
      disabled: true,
    },
  ];

  const createOrder = async (planType) => {
    if(planType == "free") return 
    const token = localStorage.getItem("jwt");
    
    if (!token) return navigate("/");
    const orderRes = await api.post("/payment/order",{plan : planType}, token);
    console.log(orderRes)
    
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Growth Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative group ${
                  plan.popular 
                    ? 'transform lg:scale-110 lg:-translate-y-4' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={`glass-effect p-8 rounded-2xl card-shadow h-full transition-all duration-500 hover:scale-105 ${
                    plan.popular ? 'border-2 border-primary/50 glow-effect' : ''
                  }`}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 rounded-xl ${
                        plan.name === 'Free' ? 'bg-muted/20' :
                        plan.name === 'Pro' ? 'bg-primary/20' :
                        'bg-accent/20'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          plan.name === 'Free' ? 'text-muted-foreground' :
                          plan.name === 'Pro' ? 'text-primary' :
                          'text-accent'
                        }`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Button 
                    onClick  = {()=> createOrder(plan.type)}
                    variant={plan.buttonVariant} 
                    size="lg" 
                    className="w-full"
                    disabled={plan.disabled}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            All plans include our core automation features and 24/7 support
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              30-day money back guarantee
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;