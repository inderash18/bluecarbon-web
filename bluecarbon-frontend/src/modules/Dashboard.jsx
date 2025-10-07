import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats] = useState({
    totalCarbon: '25,000',
    verifiedCarbon: '15,000',
    activeProjects: 5
  });

  const [projects, setProjects] = useState([
    { id: 1, name: 'Mangrove Project A', location: 'Indonesia', status: 'active', carbon: '8,000' },
    { id: 2, name: 'Seagrass Project B', location: 'Philippines', status: 'active', carbon: '5,000' },
    { id: 3, name: 'Saltmarsh Project C', location: 'Australia', status: 'active', carbon: '2,000' }
  ]);

  const handleAddProject = () => {
    // Placeholder for adding a new project
    const newProject = {
      id: projects.length + 1,
      name: 'New Blue Carbon Project',
      location: 'TBD',
      status: 'planning',
      carbon: '0'
    };
    setProjects([...projects, newProject]);
  };

  const handleProjectClick = (projectId) => {
    // Placeholder for viewing project details
    console.log(`Viewing project ${projectId}`);
  };

  const verifiedPercentage = ((parseInt(stats.verifiedCarbon.replace(/,/g, '')) / parseInt(stats.totalCarbon.replace(/,/g, ''))) * 100).toFixed(1);

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'planning':
        return 'status-planning';
      default:
        return 'status-active';
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Carbon Dashboard</h1>
      </header>

      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Carbon Captured</h3>
          <p className="stat-value">{stats.totalCarbon} tCO₂e</p>
        </div>
        <div className="stat-card">
          <h3>Verified Carbon</h3>
          <p className="stat-value">{stats.verifiedCarbon} tCO₂e</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${verifiedPercentage}%` }}
              role="progressbar"
              aria-valuenow={verifiedPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span className="progress-label">{verifiedPercentage}%</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <h3>Active Projects</h3>
          <p className="stat-value">{stats.activeProjects}</p>
        </div>
      </div>

      <div className="projects-section">
        <div className="section-header">
          <h2>Active Projects</h2>
          <button className="primary" onClick={handleAddProject}>Add New Project</button>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="project-card" 
              onClick={() => handleProjectClick(project.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleProjectClick(project.id)}
            >
              <h3>{project.name}</h3>
              <p className="project-location">{project.location}</p>
              <p className="project-carbon">{project.carbon} tCO₂e</p>
              <span className={`status-badge ${getStatusClass(project.status)}`}>{project.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;