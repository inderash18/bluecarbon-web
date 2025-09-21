// src/modules/Dashboard.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import MapView from "./MapView";
import Wallet from "./Wallet";
import Token from "./Token";
import FileUpload from "./FileUpload";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("map");

  const renderContent = () => {
    switch (activeTab) {
      case "map": return <MapView />;
      case "wallet": return <Wallet />;
      case "token": return <Token />;
      case "file": return <FileUpload />;
      default: return <MapView />;
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="main-content">
        <Sidebar setActiveTab={setActiveTab} />
        <main className="page-content">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
