import React, { useRef, useEffect } from 'react';
import { CITY_CONFIG } from '../data/movementData';

const BLOCK = 80;
const ROAD = 14;

const MapView = ({ agents = [], isRunning }) => {
  const canvasRef = useRef(null);
  const phase = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    /* ---------- CONTINUOUS ENERGY FIELD ---------- */
    const drawEnergyField = () => {
      phase.current += 0.01; // 🔑 continuous loop speed

      // cyclic offsets (never end)
      const offsetX = Math.sin(phase.current) * canvas.width * 0.4;
      const offsetY = Math.cos(phase.current) * canvas.height * 0.4;

      const grad = ctx.createLinearGradient(
        offsetX,
        offsetY,
        canvas.width + offsetX,
        canvas.height + offsetY
      );

      grad.addColorStop(0, '#020617');      // black
      grad.addColorStop(0.25, '#020b3a');   // navy
      grad.addColorStop(0.5, '#2563eb');    // blue
      grad.addColorStop(0.75, '#a855f7');   // purple
      grad.addColorStop(1, '#020617');      // black

      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    /* ---------- GRID ---------- */
    const drawGrid = () => {
      for (let x = 0; x < canvas.width; x += BLOCK) {
        for (let y = 0; y < canvas.height; y += BLOCK) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(x, y, BLOCK - ROAD, BLOCK - ROAD);
        }
      }
    };

    /* ---------- MOVE AGENTS ---------- */
    const moveAgent = (a) => {
      if (!isRunning) return;

      if (!a.dir) {
        a.dir = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
        a.speed = a.speed || Math.random() * 1.2 + 0.5;
      }

      if (a.dir === 'right') a.x += a.speed;
      if (a.dir === 'left') a.x -= a.speed;
      if (a.dir === 'down') a.y += a.speed;
      if (a.dir === 'up') a.y -= a.speed;

      if (Math.random() < 0.01) {
        a.dir = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
      }

      if (a.x < 0) a.x = CITY_CONFIG.width;
      if (a.x > CITY_CONFIG.width) a.x = 0;
      if (a.y < 0) a.y = CITY_CONFIG.height;
      if (a.y > CITY_CONFIG.height) a.y = 0;
    };

    /* ---------- RENDER LOOP ---------- */
    const render = () => {
      drawEnergyField(); // 1️⃣ continuous animated aura
      drawGrid();        // 2️⃣ grid visible on top

      agents.forEach(a => {
        moveAgent(a);

        const nearby = agents.filter(
          o => Math.hypot(o.x - a.x, o.y - a.y) < 25
        ).length;

        ctx.fillStyle = nearby > 4 ? '#ef4444' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(a.x, a.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [agents, isRunning]);

  return (
    <canvas
      ref={canvasRef}
      width={CITY_CONFIG.width}
      height={CITY_CONFIG.height}
      style={{
        borderRadius: '12px',
        border: '1px solid #1e293b',
        background: '#020617'
      }}
    />
  );
};

export default MapView;
