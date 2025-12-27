import React, { useEffect, useRef } from 'react';

const Analytics = ({ population, history }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawGraph();
  }, [history]);

  const drawGraph = () => {
    if (!canvasRef.current || history.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    /* ---------- AXES ---------- */
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + height);
    ctx.lineTo(padding + width, padding + height);
    ctx.stroke();

    /* ---------- LABELS ---------- */
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.fillText('Population →', padding + width - 90, padding + height + 30);

    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Congestion (%) →', -padding - height + 40, padding - 30);
    ctx.restore();

    /* ---------- GRAPH LINE (NON-LINEAR) ---------- */
    ctx.strokeStyle = '#a855f7'; // purple
    ctx.lineWidth = 2;
    ctx.beginPath();

    history.forEach((item, index) => {
      const popRatio = item.activeAgents / 1000;

      // 🔥 NON-LINEAR congestion
      const congestion = Math.min(Math.pow(popRatio, 2) * 100, 100);

      const x = padding + popRatio * width;
      const y = padding + height - (congestion / 100) * height;

      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      // point
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.stroke();
  };

  return (
    <div
      style={{
        background: '#020617',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '20px',
        color: '#e5e7eb'
      }}
    >
      <h2>📊 Data Analytics</h2>

      <p style={{ color: '#94a3b8' }}>
        Live Population: <strong>{population}</strong> agents
      </p>

      {/* GRAPH */}
      <canvas
        ref={canvasRef}
        width={600}
        height={350}
        style={{
          background: '#0f172a',
          borderRadius: '8px',
          marginTop: '20px'
        }}
      />

      {/* SNAPSHOT LIST */}
      <h3 style={{ marginTop: '20px' }}>🗂 Saved Snapshots</h3>

      {history.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No snapshots saved yet.</p>
      ) : (
        history.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '8px 0',
              borderBottom: '1px solid #1e293b',
              fontSize: '14px'
            }}
          >
            🕒 {new Date(item.timestamp).toLocaleTimeString()} | 👥{' '}
            {item.activeAgents} agents | 🚦{' '}
            {Math.min(Math.pow(item.activeAgents / 1000, 2) * 100, 100).toFixed(1)}
            %
          </div>
        ))
      )}
    </div>
  );
};

export default Analytics;
