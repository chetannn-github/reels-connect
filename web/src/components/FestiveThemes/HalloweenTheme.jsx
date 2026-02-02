import { useEffect, useState } from "react";

const HalloweenTheme = ({ HALLOWEEN_MODE }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!HALLOWEEN_MODE) return;

    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 6,
      size: 6 + Math.random() * 10,
    }));

    setParticles(newParticles);
  }, [HALLOWEEN_MODE]);

  if (!HALLOWEEN_MODE) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Floating bats / ghosts */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-halloween-float"
          style={{
            left: `${p.left}%`,
            top: "110%",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          <Ghost size={p.size} />
        </div>
      ))}

      {/* Hanging pumpkins (top) */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="flex gap-6 py-2">
          {[...Array(12)].map((_, i) => (
            <Pumpkin key={i} delay={i * 0.3} />
          ))}
        </div>
      </div>

      {/* Corner spiders */}
      <div className="absolute top-6 left-6">
        <Spider />
      </div>
      <div className="absolute top-6 right-6">
        <Spider />
      </div>

      {/* Fog overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
};

/* ================= COMPONENTS ================= */

// Ghost
const Ghost = ({ size }) => (
  <div
    className="bg-white/80 rounded-full relative animate-pulse"
    style={{
      width: size,
      height: size * 1.2,
      filter: "blur(0.5px)",
    }}
  >
    <div className="absolute bottom-0 left-0 right-0 flex justify-between">
      <div className="w-2 h-2 bg-white rounded-full" />
      <div className="w-2 h-2 bg-white rounded-full" />
      <div className="w-2 h-2 bg-white rounded-full" />
    </div>
  </div>
);

// Pumpkin
const Pumpkin = ({ delay }) => (
  <div
    className="relative animate-halloween-glow"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* String */}
    <div className="absolute -top-2 left-1/2 w-px h-2 bg-gray-700" />
    {/* Body */}
    <div className="w-6 h-6 bg-orange-500 rounded-full shadow-lg" />
    {/* Eyes */}
    <div className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-black rounded-full" />
    <div className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
  </div>
);

// Spider
const Spider = () => (
  <div className="relative animate-spider-crawl">
    <div className="w-4 h-4 bg-black rounded-full" />
    <div className="absolute inset-0 flex justify-between">
      <span className="w-3 h-px bg-black rotate-45" />
      <span className="w-3 h-px bg-black -rotate-45" />
    </div>
  </div>
);

export default HalloweenTheme;
