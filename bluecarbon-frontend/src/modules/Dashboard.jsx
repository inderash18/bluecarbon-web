import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats] = useState({
    totalCarbon: '25,000',
    verifiedCarbon: '15,000',
    activeProjects: 5
  });

  const [projects] = useState([
    { id: 1, name: 'Mangrove Project A', location: 'Indonesia', status: 'active' },
    { id: 2, name: 'Seagrass Project B', location: 'Philippines', status: 'active' },
    { id: 3, name: 'Saltmarsh Project C', location: 'Australia', status: 'active' }
  ]);

  return (
    <div className="dashboard">
      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Carbon Captured</h3>
          <p className="stat-value">{stats.totalCarbon} tCO₂e</p>
        </div>
        <div className="stat-card">
          <h3>Verified Carbon</h3>
          <p className="stat-value">{stats.verifiedCarbon} tCO₂e</p>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p className="stat-value">{stats.activeProjects}</p>
        </div>
      </div>

      <div className="projects-section">
        <h2>Active Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p className="project-location">{project.location}</p>
              <span className="status-badge">{project.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;