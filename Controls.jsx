import React from 'react';

const Controls = ({ isRunning, onStartStop, onSave, onReset }) => {
  return (
    <div style={container}>
      {/* START / STOP */}
      <button
        onClick={onStartStop}
        className={`ctrl-btn start ${isRunning ? 'running' : ''}`}
      >
        <span className={`btn-ray ${isRunning ? 'orange-ray' : 'green-ray'}`} />
        {isRunning ? '⏸ Stop Simulation' : '▶ Start Simulation'}
      </button>

      {/* SAVE */}
      <button onClick={onSave} className="ctrl-btn save">
        <span className="btn-ray blue-ray" />
        💾 Save Snapshot to DB
      </button>

      {/* RESET */}
      <button onClick={onReset} className="ctrl-btn reset">
        <span className="btn-ray red-ray" />
        🔄 Reset
      </button>

      {/* CSS */}
      <style>{`
        .ctrl-btn {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding: 14px;
          margin-top: 14px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          color: #fff;
          transition: all 0.25s ease;
        }

        /* POP-UP EFFECT */
        .ctrl-btn:hover {
          transform: translateY(-4px) scale(1.06);
        }

        /* BASE RAY */
        .btn-ray {
          position: absolute;
          inset: 0;
          background-size: 300% 300%;
          animation: rayMove 3.5s linear infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes rayMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        /* ================= START (GREEN) ================= */
        .ctrl-btn.start {
          background: linear-gradient(
            135deg,
            #22c55e,
            #14532d,
            #020617
          );
        }

        .green-ray {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(34, 197, 94, 0.95),
            rgba(2, 6, 23, 0.95),
            rgba(34, 197, 94, 0.95),
            transparent
          );
        }

        .ctrl-btn.start:hover {
          box-shadow: 0 14px 34px rgba(34, 197, 94, 0.6);
        }

        /* ================= RUNNING (ORANGE) ================= */
        .ctrl-btn.running {
          background: linear-gradient(
            135deg,
            #f97316,
            #9a3412,
            #020617
          );
          animation: pulseOrange 1.6s infinite;
        }

        .orange-ray {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(249, 115, 22, 0.95),
            rgba(2, 6, 23, 0.95),
            rgba(249, 115, 22, 0.95),
            transparent
          );
        }

        @keyframes pulseOrange {
          0% { box-shadow: 0 0 0 rgba(249, 115, 22, 0.6); }
          50% { box-shadow: 0 0 28px rgba(249, 115, 22, 0.95); }
          100% { box-shadow: 0 0 0 rgba(249, 115, 22, 0.6); }
        }

        /* ================= SAVE (BLUE) ================= */
        .ctrl-btn.save {
          background: linear-gradient(
            135deg,
            #3b82f6,
            #1e3a8a,
            #020617
          );
        }

        .blue-ray {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.95),
            rgba(2, 6, 23, 0.95),
            rgba(59, 130, 246, 0.95),
            transparent
          );
        }

        .ctrl-btn.save:hover {
          box-shadow: 0 14px 34px rgba(59, 130, 246, 0.7);
        }

        /* ================= RESET (RED) ================= */
        .ctrl-btn.reset {
          background: linear-gradient(
            135deg,
            #ef4444,
            #7f1d1d,
            #020617
          );
        }

        .red-ray {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(239, 68, 68, 0.95),
            rgba(2, 6, 23, 0.95),
            rgba(239, 68, 68, 0.95),
            transparent
          );
        }

        .ctrl-btn.reset:hover {
          animation: shake 0.3s;
          box-shadow: 0 14px 34px rgba(239, 68, 68, 0.75);
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

const container = {
  marginTop: '10px'
};

export default Controls;
