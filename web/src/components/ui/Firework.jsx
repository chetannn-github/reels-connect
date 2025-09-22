import React, { useEffect } from "react";


const Firework = ({ trigger = false }) => {
  useEffect(() => {
    if (trigger && window.confetti) {
      window.confetti({
        particleCount: 1000,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [trigger]);

  return null;
};

export default Firework;
