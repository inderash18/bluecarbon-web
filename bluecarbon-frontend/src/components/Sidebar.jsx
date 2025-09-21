import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/projects', label: 'Projects', icon: 'fas fa-project-diagram' },
    { path: '/analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
    { path: '/settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  const projectStats = {
    totalCarbon: '25,000',
    activeProjects: '5',
    verifiedCredits: '15,000',
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <h2>Blue Carbon MRV</h2>
        <p className="version">v1.0.0</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <i className={item.icon}></i>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Stats */}
      <div className="sidebar-stats">
        <div className="stat-item">
          <div className="stat-label">Total Carbon</div>
          <div className="stat-value">{projectStats.totalCarbon} tCO2e</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Active Projects</div>
          <div className="stat-value">{projectStats.activeProjects}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Verified Credits</div>
          <div className="stat-value">{projectStats.verifiedCredits}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="help-button">
          <i className="fas fa-question-circle"></i>
          Help & Support
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
