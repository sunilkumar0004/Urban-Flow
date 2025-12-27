// import { useEffect, useState } from "react";

// export default function App() {
//   const GRID_W = 12;
//   const GRID_H = 8;

//   const [agents, setAgents] = useState([]);
//   const [running, setRunning] = useState(false);
//   const [ticks, setTicks] = useState(0);
//   const [population, setPopulation] = useState(10);

//   useEffect(() => {
//     if (!running) return;

//     const timer = setInterval(() => {
//       setAgents((prev) =>
//         prev.map((a) => ({
//           ...a,
//           x: (a.x + a.dx + GRID_W) % GRID_W,
//           y: (a.y + a.dy + GRID_H) % GRID_H
//         }))
//       );
//       setTicks((t) => t + 1);
//     }, 400);

//     return () => clearInterval(timer);
//   }, [running]);

//   const startSimulation = () => {
//     const arr = Array.from({ length: population }, () => ({
//       x: Math.floor(Math.random() * GRID_W),
//       y: Math.floor(Math.random() * GRID_H),
//       dx: Math.random() > 0.5 ? 1 : -1,
//       dy: Math.random() > 0.5 ? 1 : -1,
//       fast: Math.random() > 0.6
//     }));
//     setAgents(arr);
//     setTicks(0);
//     setRunning(true);
//   };

//   const congestion =
//     agents.length === 0
//       ? 0
//       : Math.round((agents.filter((a) => a.fast).length / agents.length) * 100);

//   return (
//     <>
//       {/* INLINE CSS */}
//       <style>{`
//         *{box-sizing:border-box;font-family:Segoe UI,Arial}
//         body{margin:0;background:radial-gradient(circle at top,#10162f,#070b18);color:#fff}
//         .topbar{height:70px;background:linear-gradient(90deg,#0f1a3d,#0b1025);
//           display:flex;align-items:center;justify-content:space-between;
//           padding:0 30px;border-bottom:1px solid #1f2a4a}
//         .brand{font-size:22px;font-weight:700}
//         .brand small{display:block;font-size:12px;color:#8aa4ff}
//         .tabs button{background:#0f172a;border:1px solid #24336b;
//           color:#9fb3ff;padding:8px 16px;margin-left:10px;border-radius:8px}
//         .tabs .active{background:#2e6cf6;color:#fff}
//         .layout{display:flex;height:calc(100vh - 70px)}
//         .sidebar{width:330px;padding:20px}
//         .card{background:linear-gradient(180deg,#1b2545,#121a33);
//           padding:18px;border-radius:14px;margin-bottom:18px}
//         .card h4{margin:0;font-size:14px;color:#9fb3ff}
//         .card p{font-size:28px;margin:10px 0 0;font-weight:700}
//         .controls input{width:100%}
//         .btn{width:100%;padding:12px;border:none;border-radius:10px;
//           font-weight:700;margin-top:10px;cursor:pointer}
//         .start{background:linear-gradient(90deg,#2ecc71,#27ae60);color:#fff}
//         .save{background:linear-gradient(90deg,#3b82f6,#2563eb);color:#fff}
//         .sim{flex:1;padding:20px;position:relative}
//         .legend{position:absolute;top:20px;left:20px;background:#101830;
//           padding:10px 14px;border-radius:10px;font-size:13px}
//         .legend div{display:flex;gap:8px;align-items:center}
//         .dot{width:10px;height:10px;border-radius:50%}
//         .red{background:red}.blue{background:#4aa3ff}
//         .grid{display:grid;grid-template-columns:repeat(12,1fr);
//           grid-template-rows:repeat(8,1fr);gap:12px;height:100%}
//         .cell{background:linear-gradient(145deg,#121a33,#0d1428);
//           border-radius:12px;position:relative}
//         .agent{width:8px;height:8px;border-radius:50%;
//           position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
//       `}</style>

//       {/* TOP BAR */}
//       <div className="topbar">
//         <div className="brand">
//           ⚡ URBANFLOW
//           <small>City Mobility Modeling System</small>
//         </div>
//         <div className="tabs">
//           <button className="active">Simulation</button>
//           <button>Analytics</button>
//           <button>Database</button>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="layout">
//         <div className="sidebar">
//           <div className="card">
//             <h4>Population</h4>
//             <p>{agents.length} agents</p>
//           </div>
//           <div className="card">
//             <h4>Congestion</h4>
//             <p>{congestion}%</p>
//           </div>
//           <div className="card">
//             <h4>Avg Speed</h4>
//             <p>{(1 + congestion / 100).toFixed(1)} km/h</p>
//           </div>
//           <div className="card">
//             <h4>Runtime</h4>
//             <p>{ticks} ticks</p>
//           </div>
//           <div className="card controls">
//             <h4>Simulation Controls</h4>
//             <input
//               type="range"
//               min="5"
//               max="50"
//               value={population}
//               onChange={(e) => setPopulation(+e.target.value)}
//             />
//             <button className="btn start" onClick={startSimulation}>
//               ▶ Start Simulation
//             </button>
//             <button className="btn save">💾 Save Snapshot to DB</button>
//           </div>
//         </div>

//         {/* GRID */}
//         <div className="sim">
//           <div className="legend">
//             <div><span className="dot red" /> High Speed</div>
//             <div><span className="dot blue" /> Normal Flow</div>
//           </div>

//           <div className="grid">
//             {[...Array(GRID_W * GRID_H)].map((_, i) => (
//               <div key={i} className="cell">
//                 {agents
//                   .filter((a) => a.x + a.y * GRID_W === i)
//                   .map((a, idx) => (
//                     <div
//                       key={idx}
//                       className={`agent ${a.fast ? "red" : "blue"}`}
//                     />
//                   ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
