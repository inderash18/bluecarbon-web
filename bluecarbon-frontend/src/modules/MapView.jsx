import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import './MapView.css';

const MapView = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Mangrove Restoration Project',
      location: 'Indonesia',
      coordinates: [-6.2088, 106.8456],
      area: '500ha',
      type: 'Mangrove',
      carbonCapture: '8,000',
      status: 'active',
      progress: 75
    },
    {
      id: 2,
      name: 'Seagrass Conservation',
      location: 'Philippines',
      coordinates: [14.5995, 120.9842],
      area: '300ha',
      type: 'Seagrass',
      carbonCapture: '3,200',
      status: 'active',
      progress: 45
    },
    {
      id: 3,
      name: 'Saltmarsh Protection',
      location: 'Australia',
      coordinates: [-33.8688, 151.2093],
      area: '450ha',
      type: 'Saltmarsh',
      carbonCapture: '7,800',
      status: 'pending',
      progress: 30
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="map-view">
      <div className="map-header">
        <h1>Blue Carbon Projects</h1>
        <div className="map-filters">
          <button className="filter-btn active">All Projects</button>
          <button className="filter-btn">Mangroves</button>
          <button className="filter-btn">Seagrass</button>
          <button className="filter-btn">Saltmarsh</button>
        </div>
      </div>

      <div className="map-content">
        <MapContainer
          center={[-6.2088, 106.8456]}
          zoom={4}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {projects.map((project) => (
            <React.Fragment key={project.id}>
              <CircleMarker
                center={project.coordinates}
                radius={20}
                pathOptions={{
                  fillColor: project.status === 'active' ? '#2ecc71' : '#f1c40f',
                  color: '#fff',
                  weight: 2,
                  fillOpacity: 0.7
                }}
                eventHandlers={{
                  click: () => handleProjectClick(project)
                }}
              />
              <Marker position={project.coordinates}>
                <Popup>
                  <div className="map-popup">
                    <h3>{project.name}</h3>
                    <p className="location">{project.location}</p>
                    <div className="popup-stats">
                      <div className="stat">
                        <span className="label">Type</span>
                        <span className="value">{project.type}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Area</span>
                        <span className="value">{project.area}</span>
                      </div>
                      <div className="stat">
                        <span className="label">Carbon Capture</span>
                        <span className="value">{project.carbonCapture} tCO2e</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>

        <div className="project-sidebar">
          <div className="sidebar-header">
            <h2>Project List</h2>
            <p>{projects.length} Projects</p>
          </div>
          
          <div className="project-list">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p className="location">
                    <i className="fas fa-map-marker-alt"></i> {project.location}
                  </p>
                  <div className="project-meta">
                    <span className="type">{project.type}</span>
                    <span className="area">{project.area}</span>
                  </div>
                </div>
                <div className="project-carbon">
                  <div className="carbon-value">{project.carbonCapture}</div>
                  <div className="carbon-label">tCO2e</div>
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


