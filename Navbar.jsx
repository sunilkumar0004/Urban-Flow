import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabStyle = (tab) => ({
    padding: '8px 16px',
    borderRadius: '10px',
    border: '1px solid #1e293b',
    cursor: 'pointer',
    background: activeTab === tab ? '#2563eb' : '#020617',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 2
  });

  return (
    <div style={navbarContainer}>
      {/* MOVING RAY */}
      <div className="nav-ray" />

      {/* CONTENT */}
      <div style={navbarContent}>
        {/* LEFT: LOGO + TITLE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={logoBox}>〰</div>

          <div>
            {/* 🔥 ANIMATED TEXT */}
            <h2 className="urbanflow-text">URBANFLOW</h2>
            <small style={{ color: '#94a3b8' }}>
              City Mobility Modeling System
            </small>
          </div>
        </div>

        {/* RIGHT: TABS */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('simulation')}
            style={tabStyle('simulation')}
          >
            📘 Simulation
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            style={tabStyle('analytics')}
          >
            📊 Data Analytics
          </button>

          <button
            onClick={() => setActiveTab('records')}
            style={tabStyle('records')}
          >
            🗄 Database Records
          </button>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        /* ===== NAV RAY ===== */
        .nav-ray {
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(168, 85, 247, 0.35),
            rgba(37, 99, 235, 0.35),
            transparent
          );
          animation: sweep 4s infinite linear;
          pointer-events: none;
        }

        @keyframes sweep {
          0% { left: -40%; }
          100% { left: 120%; }
        }

        /* ===== URBANFLOW TEXT ANIMATION ===== */
        .urbanflow-text {
          margin: 0;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 2px;
          font-size: 22px;

          background: linear-gradient(
            270deg,
            #2563eb,
            #a855f7,
            #020b3a,
            #2563eb
          );
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          animation: textFlow 6s ease infinite, glowPulse 3s ease-in-out infinite;
        }

        @keyframes textFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glowPulse {
          0% {
            text-shadow: 0 0 6px rgba(168, 85, 247, 0.4);
          }
          50% {
            text-shadow: 0 0 14px rgba(37, 99, 235, 0.9);
          }
          100% {
            text-shadow: 0 0 6px rgba(168, 85, 247, 0.4);
          }
        }
      `}</style>
    </div>
  );
};

/* ================= STYLES ================= */

const navbarContainer = {
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(90deg, #020617, #0f172a)',
  borderBottom: '1px solid #1e293b'
};

const navbarContent = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 24px',
  position: 'relative',
  zIndex: 2
};

const logoBox = {
  width: '42px',
  height: '42px',
  borderRadius: '10px',
  background: 'linear-gradient(135deg, #2563eb, #a855f7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '20px',
  fontWeight: 'bold',
  boxShadow: '0 0 14px rgba(168, 85, 247, 0.7)'
};

export default Navbar;
