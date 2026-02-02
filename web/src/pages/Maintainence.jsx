import { Settings, Wrench, Clock, Cog, RefreshCw, Zap } from "lucide-react";
import { Card } from "../components/ui/card";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Moving Orbs */}
        <div className="absolute w-4 h-4 bg-primary/40 rounded-full blur-sm" style={{ 
          animation: "float1 15s ease-in-out infinite",
          top: "20%", left: "10%" 
        }} />
        <div className="absolute w-3 h-3 bg-accent/50 rounded-full blur-sm" style={{ 
          animation: "float2 12s ease-in-out infinite",
          top: "60%", right: "15%" 
        }} />
        <div className="absolute w-5 h-5 bg-primary/30 rounded-full blur-sm" style={{ 
          animation: "float3 18s ease-in-out infinite",
          bottom: "30%", left: "20%" 
        }} />
        <div className="absolute w-2 h-2 bg-accent/60 rounded-full" style={{ 
          animation: "float1 10s ease-in-out infinite reverse",
          top: "40%", right: "30%" 
        }} />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 right-1/4 text-primary/20 animate-bounce" style={{ animationDuration: "3s" }}>
          <Wrench className="w-8 h-8" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-accent/20" style={{ animation: "spin 8s linear infinite" }}>
          <Settings className="w-10 h-10" />
        </div>
        <div className="absolute top-1/3 left-[10%] text-primary/15 animate-bounce" style={{ animationDuration: "5s", animationDelay: "0.5s" }}>
          <Clock className="w-6 h-6" />
        </div>
        <div className="absolute bottom-1/4 right-[15%] text-accent/25" style={{ animation: "spin 6s linear infinite reverse" }}>
          <Cog className="w-12 h-12" />
        </div>
        <div className="absolute top-[15%] right-[10%] text-primary/20" style={{ animation: "spin 10s linear infinite" }}>
          <RefreshCw className="w-8 h-8" />
        </div>
        <div className="absolute bottom-[20%] left-[8%] text-accent/30 animate-ping" style={{ animationDuration: "2s" }}>
          <Zap className="w-5 h-5" />
        </div>

        {/* Rotating Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/10 rounded-full" style={{ animation: "spin 30s linear infinite" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent/10 rounded-full" style={{ animation: "spin 25s linear infinite reverse" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" style={{ animation: "spin 40s linear infinite" }} />
      </div>

      <Card className="max-w-lg w-full glass-effect border-border/50 p-8 text-center space-y-6 relative z-10 animate-fade-in">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-primary/30 blur-xl animate-ping" style={{ animationDuration: "3s" }} />
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse relative">
              <Wrench className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Settings className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center">
              <Cog className="w-3 h-3 text-primary animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Under Maintenance
          </h1>
          <p className="text-muted-foreground text-lg">
            We're working hard to improve your experience. Please check back soon!
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>Expected downtime: A few hours</span>
        </div>

        <div className="pt-4">
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: "100ms" }} />
            <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
            <div className="w-2 h-2 bg-accent/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(100px, -50px) scale(1.2); }
          50% { transform: translate(50px, 100px) scale(0.8); }
          75% { transform: translate(-50px, 50px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-80px, 60px) rotate(120deg); }
          66% { transform: translate(60px, -40px) rotate(240deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(70px, -30px); }
          40% { transform: translate(30px, 80px); }
          60% { transform: translate(-60px, 40px); }
          80% { transform: translate(-30px, -60px); }
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Maintenance;
