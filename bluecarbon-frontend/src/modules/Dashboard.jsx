import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: chartRef, inView: chartInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: activitiesRef, inView: activitiesInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [projectStats] = useState({
    totalCarbon: '25,000',
    monthlyCarbon: '2,500',
    verifiedCredits: '15,000',
    pendingVerification: '10,000',
    activeProjects: 5,
    completedProjects: 8,
    carbonTrend: 12.5,
    verificationRate: 85
  });

  const [chartData] = useState([
    { name: 'Jan', carbon: 4000 },
    { name: 'Feb', carbon: 3000 },
    { name: 'Mar', carbon: 5000 },
    { name: 'Apr', carbon: 4500 },
    { name: 'May', carbon: 6000 },
    { name: 'Jun', carbon: 5500 },
    { name: 'Jul', carbon: 7000 },
    { name: 'Aug', carbon: 6500 },
    { name: 'Sep', carbon: 8000 }
  ]);

  const [recentActivities] = useState([
    { id: 1, type: 'verification', project: 'Mangrove Project A', status: 'completed', date: '2025-09-20', amount: '5,000', time: '2 hours ago' },
    { id: 2, type: 'measurement', project: 'Seagrass Project B', status: 'pending', date: '2025-09-19', amount: '3,200', time: '1 day ago' },
    { id: 3, type: 'tokenization', project: 'Saltmarsh Project C', status: 'in-progress', date: '2025-09-18', amount: '7,800', time: '2 days ago' },
    { id: 4, type: 'verification', project: 'Coral Reef Project D', status: 'completed', date: '2025-09-17', amount: '4,200', time: '3 days ago' }
  ]);

  const [projects] = useState([
    { id: 1, name: 'Mangrove Project A', location: 'Indonesia', area: '500ha', carbonCapture: '8,000', progress: 85, status: 'active' },
    { id: 2, name: 'Seagrass Project B', location: 'Philippines', area: '300ha', carbonCapture: '3,200', progress: 60, status: 'active' },
    { id: 3, name: 'Saltmarsh Project C', location: 'Australia', area: '450ha', carbonCapture: '7,800', progress: 45, status: 'active' },
    { id: 4, name: 'Coral Reef Project D', location: 'Maldives', area: '200ha', carbonCapture: '4,200', progress: 90, status: 'completed' }
  ]);

  const [carbonData] = useState([
    { month: 'Jan', carbon: 18000 },
    { month: 'Feb', carbon: 19000 },
    { month: 'Mar', carbon: 21000 },
    { month: 'Apr', carbon: 22000 },
    { month: 'May', carbon: 23000 },
    { month: 'Jun', carbon: 24000 },
    { month: 'Jul', carbon: 25000 }
  ]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Carbon Credit Dashboard</h1>
          <p>Monitor and manage your blue carbon projects</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <i className="fas fa-plus"></i> New Project
          </button>
          <button className="btn-secondary">
            <i className="fas fa-download"></i> Export Report
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stat-card gradient-1">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-tree"></i>
              </div>
              <div className="stat-trend positive">
                <i className="fas fa-arrow-up"></i> {projectStats.carbonTrend}%
              </div>
            </div>
            <div className="stat-content">
              <h3>Total Carbon Captured</h3>
              <p className="stat-value">{projectStats.totalCarbon} tCO₂e</p>
              <p className="stat-change">+{projectStats.monthlyCarbon} this month</p>
            </div>
          </div>

          <div className="stat-card gradient-2">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <div className="stat-trend positive">
                <i className="fas fa-check"></i> {projectStats.verificationRate}%
              </div>
            </div>
            <div className="stat-content">
              <h3>Verified Credits</h3>
              <p className="stat-value">{projectStats.verifiedCredits} tCO₂e</p>
              <p className="stat-info">Ready for tokenization</p>
            </div>
          </div>

          <div className="stat-card gradient-3">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-trend warning">
                <i className="fas fa-sync"></i> In Progress
              </div>
            </div>
            <div className="stat-content">
              <h3>Pending Verification</h3>
              <p className="stat-value">{projectStats.pendingVerification} tCO₂e</p>
              <p className="stat-info">In verification process</p>
            </div>
          </div>

          <div className="stat-card gradient-4">
            <div className="stat-header">
              <div className="stat-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <div className="stat-trend positive">
                <i className="fas fa-chart-line"></i> Growing
              </div>
            </div>
            <div className="stat-content">
              <h3>Project Portfolio</h3>
              <p className="stat-value">{projectStats.activeProjects} Active</p>
              <p className="stat-info">{projectStats.completedProjects} Completed</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Carbon Capture Trend</h3>
              <select className="chart-filter">
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="chart-container">
              <div className="carbon-chart">
                {carbonData.map((data, index) => (
                  <div key={index} className="chart-bar">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${(data.carbon / 30000) * 100}%` }}
                    ></div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="activities-section">
          <div className="section-header">
            <h2>Recent Activities</h2>
            <Link to="/activities" className="view-all">View All</Link>
          </div>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.status}`}>
                <div className="activity-icon">
                  <i className={`fas fa-${
                    activity.type === 'verification' ? 'check-double' : 
                    activity.type === 'measurement' ? 'ruler-combined' : 'coins'
                  }`}></i>
                </div>
                <div className="activity-content">
                  <h4>{activity.project}</h4>
                  <p className="activity-type">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-amount">{activity.amount} tCO₂e</span>
                  <span className={`activity-status ${activity.status}`}>
                    <i className={`fas fa-${
                      activity.status === 'completed' ? 'check-circle' :
                      activity.status === 'in-progress' ? 'sync' : 'clock'
                    }`}></i> {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Overview */}
        <div className="projects-section">
          <div className="section-header">
            <h2>Active Projects</h2>
            <Link to="/projects" className="view-all">View All Projects</Link>
          </div>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <div className="project-badge">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <span className="project-location">
                      <i className="fas fa-map-marker-alt"></i> {project.location}
                    </span>
                  </div>
                </div>
                
                <div className="project-stats">
                  <div className="project-stat">
                    <span className="stat-label">Area Coverage</span>
                    <span className="stat-value">{project.area}</span>
                  </div>
                  <div className="project-stat">
                    <span className="stat-label">Carbon Capture</span>
                    <span className="stat-value">{project.carbonCapture} tCO₂e</span>
                  </div>
                </div>

                <div className="project-progress">
                  <div className="progress-header">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="project-actions">
                  <Link to={`/project/${project.id}`} className="project-link">
                    View Details <i className="fas fa-arrow-right"></i>
                  </Link>
                  <button className="btn-icon">
                    <i className="fas fa-chart-bar"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;