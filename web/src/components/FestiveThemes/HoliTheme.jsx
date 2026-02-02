import { useEffect, useState } from "react";

const HOLI_COLORS = [
  "#ec4899", // pink
  "#22c55e", // green
  "#3b82f6", // blue
  "#f97316", // orange
  "#a855f7", // purple
  "#eab308", // yellow
];

const HoliTheme = ({ HOLI_MODE }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!HOLI_MODE) return;

    const newParticles = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 5 + Math.random() * 6,
      size: 6 + Math.random() * 14,
      color: HOLI_COLORS[Math.floor(Math.random() * HOLI_COLORS.length)],
    }));

    setParticles(newParticles);
  }, [HOLI_MODE]);

  if (!HOLI_MODE) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Flying gulal particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-holi-float"
          style={{
            left: `${p.left}%`,
            top: "110%",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          <Gulal size={p.size} color={p.color} />
        </div>
      ))}

      {/* Top hanging color pots */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="flex gap-6 py-2">
          {[...Array(10)].map((_, i) => (
            <ColorPot key={i} delay={i * 0.25} />
          ))}
        </div>
      </div>

      {/* Corner water splashes */}
      <div className="absolute bottom-6 left-6">
        <Splash />
      </div>
      <div className="absolute bottom-6 right-6">
        <Splash />
      </div>

      {/* Color mist overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-pink-400/20 via-yellow-300/10 to-transparent" />
    </div>
  );
};

/* ================= COMPONENTS ================= */

// Gulal particle
const Gulal = ({ size, color }) => (
  <div
    className="rounded-full blur-sm animate-pulse"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      opacity: 0.8,
    }}
  />
);

// Hanging color pot
const ColorPot = ({ delay }) => (
  <div
    className="relative animate-holi-swing"
    style={{ animationDelay: `${delay}s` }}
  >
    {/* String */}
    <div className="absolute -top-3 left-1/2 w-px h-3 bg-gray-400" />
    {/* Pot */}
    <div className="w-6 h-6 rounded-full bg-amber-600 shadow-lg flex items-center justify-center">
      <div className="w-3 h-3 rounded-full bg-pink-400" />
    </div>
  </div>
);

// Water splash
const Splash = () => (
  <div className="relative animate-holi-splash">
    <div className="w-6 h-6 rounded-full bg-blue-400/70 blur-sm" />
    <div className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" />
  </div>
);

export default HoliTheme;
