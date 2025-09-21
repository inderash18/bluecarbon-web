import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Blue Carbon MRV</h3>
          <p className="footer-description">
            Empowering coastal communities through blockchain-enabled carbon credit verification and trading.
          </p>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-medium"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/map">Project Map</Link></li>
            <li><Link to="/upload">Document Upload</Link></li>
            <li><Link to="/tokens">Carbon Credits</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">API Reference</a></li>
            <li><a href="#">Knowledge Base</a></li>
            <li><a href="#">Community Forum</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Report Issue</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p>&copy; {year} Blue Carbon MRV. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
        <div className="tech-stack">
          <span>Powered by:</span>
          <div className="tech-icons">
            <i className="fab fa-ethereum" title="Ethereum"></i>
            <i className="fab fa-react" title="React"></i>
            <i className="fas fa-leaf" title="Blue Carbon"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
