import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Layout from './components/Layout';
import Dashboard from './modules/Dashboard';
import MapView from './modules/MapView';
import FileUpload from './modules/FileUpload';
import Token from './modules/Token';
import Wallet from './modules/Wallet';
import WebCam from './modules/WebCam';
import Login from './modules/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './assets/animations.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} timeout={300} classNames="page">
        <div className="route-section">
          <Routes location={location}>
            {/* Public pages */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* Protected pages rendered inside Layout (header/sidebar/footer) */}
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="map" element={<MapView />} />
              <Route path="webcam" element={<WebCam />} />
              <Route path="upload" element={<FileUpload />} />
              <Route path="tokens" element={<Token />} />
              <Route path="wallet" element={<Wallet />} />
            </Route>
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
