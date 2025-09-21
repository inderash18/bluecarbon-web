import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [projectStats, setProjectStats] = useState({
    totalCarbon: '25,000',
    monthlyCarbon: '2,500',
    verifiedCredits: '15,000',
    pendingVerification: '10,000',
    activeProjects: 5,
    completedProjects: 8
  });

  const [recentActivities] = useState([
    { id: 1, type: 'verification', project: 'Mangrove Project A', status: 'completed', date: '2025-09-20', amount: '5,000' },
    { id: 2, type: 'measurement', project: 'Seagrass Project B', status: 'pending', date: '2025-09-19', amount: '3,200' },
    { id: 3, type: 'tokenization', project: 'Saltmarsh Project C', status: 'in-progress', date: '2025-09-18', amount: '7,800' }
  ]);

  const [projects] = useState([
    { id: 1, name: 'Mangrove Project A', location: 'Indonesia', area: '500ha', carbonCapture: '8,000' },
    { id: 2, name: 'Seagrass Project B', location: 'Philippines', area: '300ha', carbonCapture: '3,200' },
    { id: 3, name: 'Saltmarsh Project C', location: 'Australia', area: '450ha', carbonCapture: '7,800' }
  ]);

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-tree"></i>
            </div>
            <div className="stat-content">
              <h3>Total Carbon Captured</h3>
              <p className="stat-value">{projectStats.totalCarbon} tCO2e</p>
              <p className="stat-change positive">+{projectStats.monthlyCarbon} this month</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Verified Credits</h3>
              <p className="stat-value">{projectStats.verifiedCredits} tCO2e</p>
              <p className="stat-info">Ready for tokenization</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h3>Pending Verification</h3>
              <p className="stat-value">{projectStats.pendingVerification} tCO2e</p>
              <p className="stat-info">In verification process</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <div className="stat-content">
              <h3>Projects</h3>
              <p className="stat-value">{projectStats.activeProjects} Active</p>
              <p className="stat-info">{projectStats.completedProjects} Completed</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="activities-section">
          <h2>Recent Activities</h2>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.status}`}>
                <div className="activity-icon">
                  <i className={`fas fa-${activity.type === 'verification' ? 'check-circle' : 
                                       activity.type === 'measurement' ? 'ruler' : 'coins'}`}></i>
                </div>
                <div className="activity-content">
                  <h4>{activity.project}</h4>
                  <p>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                  <span className="activity-amount">{activity.amount} tCO2e</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-date">{activity.date}</span>
                  <span className={`activity-status ${activity.status}`}>{activity.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Overview */}
        <div className="projects-section">
          <h2>Active Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span className="project-location">
                    <i className="fas fa-map-marker-alt"></i> {project.location}
                  </span>
                </div>
                <div className="project-stats">
                  <div className="project-stat">
                    <span className="stat-label">Area</span>
                    <span className="stat-value">{project.area}</span>
                  </div>
                  <div className="project-stat">
                    <span className="stat-label">Carbon Capture</span>
                    <span className="stat-value">{project.carbonCapture} tCO2e</span>
                  </div>
                </div>
                <Link to={`/project/${project.id}`} className="project-link">
                  View Details <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


 


export default Dashboard;
