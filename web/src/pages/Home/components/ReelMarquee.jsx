import { Card } from "../../../components/ui/Card";
import { demoReels } from "../../../lib/constant";



const ReelMarquee = () => {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center mb-2">
          Automation Demo
        </h2>
        <p className="text-center text-muted-foreground">
          Check out these sample reels & DMs to test the automation
        </p>
      </div>
      
      <div className="relative">
        <div className="flex gap-[30px] animate-marquee w-fit flex-nowrap">
          {[...demoReels, ...demoReels].map((reel, index) => (
            <a
              key={`${reel.id}-${index}`}
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="flex-shrink-0 w-[200px] glass-effect border-border/50 overflow-hidden hover:scale-105 animate-smooth group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={reel.image}
                    alt={reel.keyword}
                    className="w-full h-full object-cover group-hover:scale-110 animate-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        reel.type === "reel"
                          ? "bg-primary/80 text-primary-foreground"
                          : "bg-accent/80 text-accent-foreground"
                      }`}
                    >
                      {reel.type === "reel" ? "🎬 Reel" : "💬 DM"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-center font-semibold text-primary">
                    #{reel.keyword}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 15px));
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ReelMarquee;
