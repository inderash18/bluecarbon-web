import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './modules/Dashboard';
import MapView from './modules/MapView';
import FileUpload from './modules/FileUpload';
import Token from './modules/Token';
import Wallet from './modules/Wallet';
import WebCam from './modules/WebCam';
import './App.css';
import './assets/animations.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} timeout={300} classNames="page">
        <div className="route-section">
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/webcam" element={<WebCam />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/tokens" element={<Token />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="main-container">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="content">
            <AnimatedRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
