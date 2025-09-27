import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    className: 'custom-marker'
  });
};

const MapController = ({ selectedProject }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedProject) {
      map.setView(selectedProject.coordinates, 8, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedProject, map]);

  return null;
};

const MapView = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mapReady, setMapReady] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'Mangrove Restoration Project',
      location: 'Sunda Strait, Indonesia',
      coordinates: [-6.2088, 106.8456],
      area: '500ha',
      type: 'Mangrove',
      carbonCapture: '8,000',
      status: 'active',
      progress: 75,
      startDate: '2023-01-15',
      verification: 'Verified',
      color: '#2ecc71'
    },
    {
      id: 2,
      name: 'Seagrass Conservation Initiative',
      location: 'Palawan, Philippines',
      coordinates: [14.5995, 120.9842],
      area: '300ha',
      type: 'Seagrass',
      carbonCapture: '3,200',
      status: 'active',
      progress: 45,
      startDate: '2023-03-20',
      verification: 'Pending',
      color: '#3498db'
    },
    {
      id: 3,
      name: 'Saltmarsh Protection Program',
      location: 'Queensland, Australia',
      coordinates: [-33.8688, 151.2093],
      area: '450ha',
      type: 'Saltmarsh',
      carbonCapture: '7,800',
      status: 'pending',
      progress: 30,
      startDate: '2023-02-10',
      verification: 'In Review',
      color: '#9b59b6'
    },
    {
      id: 4,
      name: 'Coastal Wetland Restoration',
      location: 'Mekong Delta, Vietnam',
      coordinates: [10.0351, 105.7889],
      area: '620ha',
      type: 'Wetland',
      carbonCapture: '12,500',
      status: 'active',
      progress: 90,
      startDate: '2022-11-05',
      verification: 'Verified',
      color: '#e67e22'
    },
    {
      id: 5,
      name: 'Blue Carbon Research Project',
      location: 'Andaman Sea, Thailand',
      coordinates: [8.0689, 98.3378],
      area: '280ha',
      type: 'Seagrass',
      carbonCapture: '2,100',
      status: 'planning',
      progress: 15,
      startDate: '2023-04-01',
      verification: 'Not Started',
      color: '#e74c3c'
    }
  ];

  const projectTypes = ['all', 'Mangrove', 'Seagrass', 'Saltmarsh', 'Wetland'];
  const statusFilters = ['all', 'active', 'pending', 'planning'];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.type === activeFilter || project.status === activeFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Active', class: 'status-active' },
      pending: { label: 'Pending', class: 'status-pending' },
      planning: { label: 'Planning', class: 'status-planning' }
    };
    const config = statusConfig[status] || { label: status, class: 'status-default' };
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getVerificationBadge = (verification) => {
    const verificationConfig = {
      'Verified': { class: 'verified', icon: 'fas fa-check-circle' },
      'Pending': { class: 'pending', icon: 'fas fa-clock' },
      'In Review': { class: 'review', icon: 'fas fa-search' },
      'Not Started': { class: 'not-started', icon: 'fas fa-times-circle' }
    };
    const config = verificationConfig[verification] || { class: 'default', icon: 'fas fa-question' };
    return (
      <span className={`verification-badge ${config.class}`}>
        <i className={config.icon}></i> {verification}
      </span>
    );
  };

  const totalCarbon = projects.reduce((sum, project) => 
    sum + parseInt(project.carbonCapture.replace(/,/g, '')), 0
  ).toLocaleString();

  return (
    <div className="map-view">
      <div className="map-header">
        <div className="header-content">
          <h1>Blue Carbon Projects Map</h1>
          <p>Monitor and explore carbon capture projects worldwide</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <i className="fas fa-globe-americas"></i>
            <div>
              <span className="stat-value">{projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-leaf"></i>
            <div>
              <span className="stat-value">{totalCarbon}</span>
              <span className="stat-label">tCO2e Captured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="map-controls">
        <div className="filters-section">
          <div className="filter-group">
            <label>Project Type:</label>
            <div className="filter-buttons">
              {projectTypes.map(type => (
                <button
                  key={type}
                  className={`filter-btn ${activeFilter === type ? 'active' : ''}`}
                  onClick={() => setActiveFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <div className="filter-buttons">
              {statusFilters.map(status => (
                <button
                  key={status}
                  className={`filter-btn ${activeFilter === status ? 'active' : ''}`}
                  onClick={() => setActiveFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="map-actions">
          <button className="action-btn">
            <i className="fas fa-download"></i> Export Data
          </button>
          <button className="action-btn primary">
            <i className="fas fa-plus"></i> Add Project
          </button>
        </div>
      </div>

      <div className="map-content">
        <div className="map-container-wrapper">
          <MapContainer
            center={[10, 110]}
            zoom={4}
            className="map-container"
            whenReady={() => setMapReady(true)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <MapController selectedProject={selectedProject} />
            
            {mapReady && filteredProjects.map((project) => (
              <React.Fragment key={project.id}>
                <CircleMarker
                  center={project.coordinates}
                  radius={Math.sqrt(parseInt(project.carbonCapture.replace(/,/g, '')) / 100) * 2}
                  pathOptions={{
                    fillColor: project.color,
                    color: '#ffffff',
                    weight: 2,
                    fillOpacity: 0.7,
                    opacity: 1
                  }}
                  eventHandlers={{
                    click: () => setSelectedProject(project)
                  }}
                />
                <Marker 
                  position={project.coordinates}
                  icon={createCustomIcon(project.color)}
                >
                  <Popup className="custom-popup">
                    <div className="map-popup">
                      <div className="popup-header">
                        <h3>{project.name}</h3>
                        {getStatusBadge(project.status)}
                      </div>
                      <p className="location">
                        <i className="fas fa-map-marker-alt"></i> {project.location}
                      </p>
                      
                      <div className="popup-stats">
                        <div className="stat-row">
                          <div className="stat">
                            <span className="label">Project Type</span>
                            <span className="value">{project.type}</span>
                          </div>
                          <div className="stat">
                            <span className="label">Area</span>
                            <span className="value">{project.area}</span>
                          </div>
                        </div>
                        <div className="stat-row">
                          <div className="stat">
                            <span className="label">Carbon Capture</span>
                            <span className="value highlight">{project.carbonCapture} tCO2e</span>
                          </div>
                          <div className="stat">
                            <span className="label">Start Date</span>
                            <span className="value">{project.startDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="verification-status">
                        {getVerificationBadge(project.verification)}
                      </div>

                      <div className="progress-section">
                        <div className="progress-header">
                          <span>Project Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="popup-actions">
                        <button className="popup-btn primary">
                          <i className="fas fa-chart-bar"></i> View Analytics
                        </button>
                        <button className="popup-btn">
                          <i className="fas fa-external-link-alt"></i> Details
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}
          </MapContainer>
        </div>

        <div className="project-sidebar">
          <div className="sidebar-header">
            <h2>Project Portfolio</h2>
            <div className="sidebar-info">
              <span className="project-count">{filteredProjects.length} Projects</span>
              <span className="carbon-total">Total: {totalCarbon} tCO2e</span>
            </div>
          </div>
          
          <div className="project-list">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-color" style={{ backgroundColor: project.color }}></div>
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    {getStatusBadge(project.status)}
                  </div>
                  <p className="project-location">
                    <i className="fas fa-map-marker-alt"></i> {project.location}
                  </p>
                  <div className="project-meta">
                    <span className="project-type">
                      <i className="fas fa-tag"></i> {project.type}
                    </span>
                    <span className="project-area">
                      <i className="fas fa-expand-arrows-alt"></i> {project.area}
                    </span>
                  </div>
                  <div className="project-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}% Complete</span>
                  </div>
                </div>
                <div className="project-carbon">
                  <div className="carbon-value">{project.carbonCapture}</div>
                  <div className="carbon-label">tCO2e</div>
                  {getVerificationBadge(project.verification)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;