export const CITY_CONFIG = {
  width: 900,
  height: 600
};

export const generateAgents = (count) => {
  const congestionFactor = Math.min(count / 1000, 1); // 0 → 1
  const maxSpeed = count <= 100 ? 5 : 5 * (1 - congestionFactor) + 0.5;

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * CITY_CONFIG.width,
    y: Math.random() * CITY_CONFIG.height,
    baseSpeed: Math.random() * maxSpeed + 0.5, // km/h
    speed: 0, // calculated dynamically
    dir: null,
    init: false
  }));
};
