import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './modules/Dashboard';
import MapView from './modules/MapView';
import FileUpload from './modules/FileUpload';
import Token from './modules/Token';
import Wallet from './modules/Wallet';
import './App.css';

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
          <Sidebar isOpen={isSidebarOpen} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/tokens" element={<Token />} />
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
