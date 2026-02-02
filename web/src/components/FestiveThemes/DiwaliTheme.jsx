import { useEffect, useState } from "react";

const DiwaliTheme = ({DIWALI_MODE}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!DIWALI_MODE) return;
    
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 4 + Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

  if (!DIWALI_MODE) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Floating Sparkles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float-up"
          style={{
            left: `${particle.left}%`,
            bottom: "-20px",
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          <div
            className="rounded-full bg-gradient-to-t from-amber-500 to-yellow-300"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 183, 77, 0.8)`,
            }}
          />
        </div>
      ))}

      {/* Corner Diyas */}
      <div className="absolute bottom-4 left-4">
        <Diya />
      </div>
      <div className="absolute bottom-4 right-4">
        <Diya />
      </div>

      {/* Top Corner Rangoli Dots */}
      <div className="absolute top-4 left-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: ["#FF6B35", "#FFB347", "#FFD700", "#FF6B35", "#FFB347"][i],
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute top-4 right-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: ["#FFB347", "#FF6B35", "#FFD700", "#FFB347", "#FF6B35"][i],
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle golden overlay on edges */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-amber-500/5 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-orange-500/5 to-transparent" />
    </div>
  );
};

// Diya Component
const Diya = () => (
  <div className="relative">
    {/* Flame */}
    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
      <div className="w-3 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-flicker" 
           style={{ filter: "blur(1px)" }} />
      <div className="absolute inset-0 w-3 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-white rounded-full animate-flicker opacity-60" 
           style={{ animationDelay: "0.1s" }} />
    </div>
    {/* Diya base */}
    <div className="w-8 h-4 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full" />
    <div className="w-10 h-2 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full -mt-1 mx-auto" 
         style={{ marginLeft: "-1px" }} />
    {/* Glow */}
    <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
  </div>
);

export default DiwaliTheme;
