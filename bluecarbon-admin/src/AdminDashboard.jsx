import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./pages/DashboardHome";
import PlantsPage from "./pages/PlantsPage";
import HistoryPage from "./pages/HistoryPage";
import MintPage from "./pages/MintPage";

export default function AdminDashboard() {
  const [section, setSection] = useState("dashboard");

  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return <DashboardHome />;
      case "plants":
        return <PlantsPage />;
      case "history":
        return <HistoryPage />;
      case "mint":
        return <MintPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" role="main" aria-label="Admin Dashboard">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-gray-900 animate-gradient"></div>
      <div className="relative z-10">
        <div className="fixed top-6 left-64 right-8 z-10 bg-white/30 backdrop-blur-md shadow-md p-4 px-8 rounded-xl text-2xl font-bold">
          <div className="text-gray-900">Admin Dashboard</div>
        </div>
        <div className="flex pt-14">
          <Sidebar current={section} onSelect={setSection} />
          <main className="flex-1 ml-60 p-8 space-y-8">
            {renderSection()}
          </main>
        </div>
      </div>
    </div>
  );
}