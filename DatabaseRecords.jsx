import React, { useState } from 'react';

const DatabaseRecords = ({ history = [] }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={container}>
      {/* RAY BACKGROUND */}
      <div className="records-ray" />

      <div style={content}>
        <h2 style={{ marginTop: 0 }}>🗄 Database Records</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Saved simulation snapshots from MongoDB
        </p>

        {history.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No records found.</p>
        ) : (
          <div style={table}>
            {/* HEADER */}
            <div style={{ ...row, ...header }}>
              <div>Time</div>
              <div>Population</div>
              <div>Avg Speed</div>
              <div>Congestion</div>
              <div>Action</div>
            </div>

            {/* DATA */}
            {history.map((item, i) => {
              const congestion =
                item.congestion ??
                Math.min((item.activeAgents / 1000) * 100, 100);

              return (
                <div key={i}>
                  <div style={row}>
                    <div>
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                    <div>{item.activeAgents}</div>
                    <div>{item.averageSpeed.toFixed(2)} km/h</div>
                    <div>{congestion.toFixed(1)}%</div>
                    <div>
                      <button
                        onClick={() =>
                          setExpanded(expanded === i ? null : i)
                        }
                        style={viewBtn}
                      >
                        {expanded === i ? 'Hide' : 'View'}
                      </button>
                    </div>
                  </div>

                  {/* EXPANDED VIEW */}
                  {expanded === i && (
                    <div style={details}>
                      <p>📍 Hotspots:</p>
                      <ul>
                        {(item.hotspots || []).map((h, idx) => (
                          <li key={idx}>{h}</li>
                        ))}
                      </ul>

                      <p style={{ marginTop: '10px', color: '#94a3b8' }}>
                        Snapshot ID: {item._id}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RAY CSS */}
      <style>{`
        .records-ray {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(168, 85, 247, 0.15),
            rgba(37, 99, 235, 0.15),
            transparent
          );
          animation: recordsSweep 6s linear infinite;
          pointer-events: none;
        }

        @keyframes recordsSweep {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

/* ================= STYLES ================= */

const container = {
  position: 'relative',
  overflow: 'hidden',
  background: '#020617',
  border: '1px solid #1e293b',
  borderRadius: '12px',
  padding: '20px',
  color: '#e5e7eb'
};

const content = {
  position: 'relative',
  zIndex: 2
};

const table = {
  marginTop: '16px',
  border: '1px solid #1e293b',
  borderRadius: '10px',
  overflow: 'hidden'
};

const row = {
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
  padding: '12px',
  borderBottom: '1px solid #1e293b',
  alignItems: 'center',
  fontSize: '14px'
};

const header = {
  background: '#0f172a',
  fontWeight: 'bold',
  color: '#c7d2fe'
};

const viewBtn = {
  background: '#2563eb',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  color: '#fff'
};

const details = {
  background: '#020617',
  borderTop: '1px solid #1e293b',
  padding: '12px',
  fontSize: '14px'
};

export default DatabaseRecords;
