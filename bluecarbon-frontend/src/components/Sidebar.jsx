import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/map', label: 'Map View', icon: 'fas fa-map' },
    { path: '/upload', label: 'Upload', icon: 'fas fa-upload' },
    { path: '/tokens', label: 'Tokens', icon: 'fas fa-coins' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path}>
              <i className={item.icon}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
