import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/map', label: 'Map View', icon: 'fas fa-map' },
    { path: '/upload', label: 'Upload', icon: 'fas fa-upload' },
    { path: '/tokens', label: 'Tokens', icon: 'fas fa-coins' },
    { path: '/webcam', label: 'WebCam', icon: 'fas fa-camera' }
  ];

  // Close sidebar when route changes (useful for mobile).
  // Don't run on initial mount — only when the pathname actually changes
  // and the sidebar is currently open.
  const _initialPath = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== _initialPath.current && isOpen) {
      onClose();
    }
    _initialPath.current = location.pathname;
  }, [location.pathname, isOpen, onClose]);

  // Close sidebar on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Navigation</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav>
          <ul className="sidebar-menu">
            {menuItems.map(item => (
              <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="app-version">v1.0.0</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;