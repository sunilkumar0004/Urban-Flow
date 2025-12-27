import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MapView from '../components/MapView';
import Controls from '../components/Controls';
import Navbar from '../components/Navbar';
import Analytics from '../components/Analytics'; // ✅ ADDED
import DatabaseRecords from './DatabaseRecords';
import { generateAgents } from '../data/movementData';

const Dashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('simulation');
  const [history, setHistory] = useState([]);
  const [population, setPopulation] = useState(200);
  const [runtime, setRuntime] = useState(0);

  const agentsRef = useRef(generateAgents(population));

  /* ---------------- FETCH DB HISTORY ---------------- */
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await axios.get('/api/movement/history');
    setHistory(res.data);
  };

  /* ---------------- RUNTIME (TICKS) ---------------- */
  useEffect(() => {
    if (!isRunning) return;

    let id;
    const tick = () => {
      setRuntime(r => r + 1);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(id);
  }, [isRunning]);

  /* ---------------- METRICS ---------------- */
  const avgSpeed =
    agentsRef.current.reduce((a, b) => a + b.speed, 0) /
    agentsRef.current.length;

  const congestion =
    (agentsRef.current.filter(a => a.speed < 0.8).length /
      agentsRef.current.length) *
    100;

  /* ---------------- HANDLERS ---------------- */
  const handleStartStop = () => setIsRunning(prev => !prev);

  const handleReset = () => {
    agentsRef.current = generateAgents(population);
    setIsRunning(false);
    setRuntime(0);
  };

  const handleSave = async () => {
    await axios.post('/api/movement/log', {
      activeAgents: population,
      averageSpeed: avgSpeed,
      congestion
    });
    fetchHistory(); // ✅ refresh analytics + records
    alert('Snapshot saved to DB');
  };

  return (
    <div style={{ background: '#0b1220', minHeight: '100vh', color: '#fff' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ padding: '20px', maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* ================= SIMULATION TAB (UNCHANGED) ================= */}
        {activeTab === 'simulation' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '340px 1fr',
              gap: '20px'
            }}
          >
            <div style={sidebar}>
              <StatCard icon="👥" title="Population" value={`${population} agents`} />
              <StatCard icon="🚦" title="Congestion" value={`${congestion.toFixed(0)} %`} />
              <StatCard icon="⚡" title="Avg Speed" value={`${avgSpeed.toFixed(1)} km/h`} />
              <StatCard icon="⏱️" title="Runtime" value={`${runtime} ticks`} />

              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8' }}>
                  TOTAL AGENTS (POPULATION)
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={population}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setPopulation(val);
                    agentsRef.current = generateAgents(val);
                  }}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    accentColor: '#a855f7'
                  }}
                />
              </div>

              <Controls
                isRunning={isRunning}
                onStartStop={handleStartStop}
                onReset={handleReset}
                onSave={handleSave}
              />

              <div
                style={{
                  background: '#020617',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '16px'
                }}
              >
                <h4 style={{ marginTop: 0 }}>📡 Live Congestion Feed</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                  Monitoring {population} active agents in real time.
                </p>
              </div>
            </div>

            <MapView agents={agentsRef.current} isRunning={isRunning} />
          </div>
        )}

        {/* ================= ANALYTICS TAB (NEW, CONNECTED) ================= */}
        {activeTab === 'analytics' && (
          <Analytics
            population={population}
            history={history}
          />
        )}

        {/* ================= DATABASE RECORDS TAB (CONNECTED) ================= */}
        {activeTab === 'records' && (
          <DatabaseRecords history={history} />
        )}
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const sidebar = {
  background: '#020617',
  padding: '16px',
  borderRadius: '12px',
  border: '1px solid #1e293b',
  display: 'grid',
  gap: '14px'
};

const StatCard = ({ icon, title, value }) => (
  <div
    style={{
      background: '#0f172a',
      padding: '14px',
      borderRadius: '10px',
      border: '1px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}
  >
    <div style={{ fontSize: '22px' }}>{icon}</div>
    <div>
      <small style={{ color: '#94a3b8' }}>{title}</small>
      <h3 style={{ margin: 0 }}>{value}</h3>
    </div>
  </div>
);

export default Dashboard;
