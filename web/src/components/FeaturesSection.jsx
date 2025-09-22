import { Bot, TrendingUp, Shield, Clock, BarChart3, MessageCircle } from "lucide-react";

const FeaturesSection = () => {
 const features = [
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


  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Maximum Growth
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to dominate Instagram with automated, high-converting content
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="glass-effect p-8 rounded-2xl card-shadow h-full transition-all duration-500 hover:scale-105 hover:glow-effect">
                  <div className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Instagram?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of creators who've scaled their Instagram presence with our automation platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>100+ happy customers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>1000+ reels automated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;