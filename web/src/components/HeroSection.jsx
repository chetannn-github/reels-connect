import { Button } from "./ui/Button";
import { Instagram, Zap, TrendingUp } from "lucide-react";
import heroImage from "../assets/hero-bg.jpeg";
import api from "../lib/api"


const HeroSection = () => {

  const handleIGAuth = async() => {
    let res = await api.get("/ig/add");
    console.log(res);
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Instagram Automation Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="glass-effect p-4 rounded-xl">
          <Instagram className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="glass-effect p-4 rounded-xl">
          <Zap className="w-8 h-8 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="glass-effect p-4 rounded-xl">
          <TrendingUp className="w-8 h-8 text-success" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Automate Your
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Instagram Reels
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect your Instagram, select keywords, and let AI create and post engaging reels automatically. 
            Scale your content creation like never before.
          </p>
          
          <div className="flex justify-center" onClick={handleIGAuth}>
            <Button variant="hero" size="xl" className="animate-glow-pulse">
              Start Free Automation
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Setup in 2 minutes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;