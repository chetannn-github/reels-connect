import { useEffect, useState } from "react";


const ChristmasTheme = ({CHRISTMAS_MODE}) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    if (!CHRISTMAS_MODE) return;
    
    const newSnowflakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 4 + Math.random() * 8,
    }));
    setSnowflakes(newSnowflakes);
  }, []);

  if (!CHRISTMAS_MODE) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Falling Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snow-fall"
          style={{
            left: `${flake.left}%`,
            top: "-20px",
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          <div
            className="rounded-full bg-white"
            style={{
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              boxShadow: `0 0 ${flake.size}px rgba(255, 255, 255, 0.8)`,
            }}
          />
        </div>
      ))}

      {/* Christmas Lights - Top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="flex gap-6 py-2">
          {[...Array(15)].map((_, i) => (
            <ChristmasLight key={i} color={["red", "green", "gold", "blue"][i % 4]} delay={i * 0.2} />
          ))}
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-4 left-4">
        <CandyCane />
      </div>
      <div className="absolute bottom-4 right-4">
        <CandyCane flipped />
      </div>

      {/* Holly in corners */}
      <div className="absolute top-12 left-4 flex gap-1">
        <Holly />
      </div>
      <div className="absolute top-12 right-4 flex gap-1">
        <Holly />
      </div>

      {/* Subtle snow overlay on edges */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />
    </div>
  );
};

// Christmas Light Component
const ChristmasLight = ({ color, delay }) => {
  const colorMap = {
    red: "bg-red-500",
    green: "bg-green-500",
    gold: "bg-yellow-400",
    blue: "bg-blue-400",
  };
  
  const glowMap = {
    red: "rgba(239, 68, 68, 0.8)",
    green: "rgba(34, 197, 94, 0.8)",
    gold: "rgba(250, 204, 21, 0.8)",
    blue: "rgba(96, 165, 250, 0.8)",
  };

  return (
    <div className="relative">
      {/* Wire */}
      <div className="absolute -top-2 left-1/2 w-px h-2 bg-gray-600" />
      {/* Bulb */}
      <div
        className={`w-3 h-4 ${colorMap[color]} rounded-full animate-christmas-glow`}
        style={{
          animationDelay: `${delay}s`,
          boxShadow: `0 0 10px ${glowMap[color]}`,
        }}
      />
    </div>
  );
};

// Candy Cane Component
const CandyCane = ({ flipped } ) => (
  <div className={`relative ${flipped ? "scale-x-[-1]" : ""}`}>
    <div className="w-4 h-12 relative">
      {/* Candy cane stripes */}
      <div className="absolute inset-0 rounded-full overflow-hidden" 
           style={{ 
             background: "repeating-linear-gradient(45deg, #ef4444, #ef4444 4px, white 4px, white 8px)",
             width: "8px",
             height: "40px",
             borderRadius: "4px"
           }} />
      {/* Hook */}
      <div className="absolute -top-2 left-0 w-6 h-6 border-4 border-t-0 border-l-0 rounded-br-full"
           style={{ 
             borderImage: "repeating-linear-gradient(45deg, #ef4444, #ef4444 4px, white 4px, white 8px) 1"
           }} />
    </div>
    {/* Glow */}
    <div className="absolute -inset-2 bg-red-500/10 rounded-full blur-md animate-pulse" />
  </div>
);

// Holly Component
const Holly = () => (
  <div className="relative flex items-center gap-0.5">
    {/* Leaves */}
    <div className="w-3 h-2 bg-green-600 rounded-full transform -rotate-45" />
    <div className="w-3 h-2 bg-green-700 rounded-full transform rotate-45 -ml-1" />
    {/* Berries */}
    <div className="flex gap-0.5 -ml-1">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
    </div>
  </div>
);

export default ChristmasTheme;
