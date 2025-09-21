// src/components/Sidebar.jsx
import React from "react";

function Sidebar({ setActiveTab }) {
  return (
    <aside className="sidebar">
      <h2>Dashboard</h2>
      <button onClick={() => setActiveTab("map")}>🌍 Map</button>
      <button onClick={() => setActiveTab("wallet")}>💰 Wallet</button>
      <button onClick={() => setActiveTab("token")}>🪙 Tokens</button>
      <button onClick={() => setActiveTab("file")}>📂 Upload</button>
    </aside>
  );
}

export default Sidebar;
