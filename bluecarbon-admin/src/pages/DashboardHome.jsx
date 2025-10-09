import React from "react";

export default function DashboardHome() {
  const cardBaseClasses = "bg-white/30 rounded-xl shadow-2xl hover:shadow-2xl transition-shadow p-6 flex flex-col items-center backdrop-blur-md";
  const statusNumberClasses = "bg-gray-100 rounded-md shadow-md text-4xl font-bold w-full h-20 flex items-center justify-center";
  const notificationItemClasses = "bg-white p-3 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleMintRequestClick = (notification) => {
    // Placeholder for minting request handler
    alert(`Minting request triggered for: ${notification}`);
  };

  return (
    <div className="p-8 space-y-8" role="main" aria-label="Dashboard Home">
      {/* Top Row: Map and Notifications */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8" aria-label="Map and Notifications">
        <section
          className="col-span-2 bg-white/30 rounded-xl shadow-2xl hover:shadow-2xl transition-shadow p-6 h-96 flex items-center justify-center backdrop-blur-md"
          aria-label="Map showing plant locations"
          role="region"
        >
          <div className="text-gray-400">Map showing plant locations</div>
        </section>

        <section
          className="bg-white/30 rounded-xl shadow-2xl hover:shadow-2xl transition-shadow p-6 h-96 overflow-auto backdrop-blur-md"
          aria-label="Notifications"
          role="region"
        >
          <h2 className="text-lg font-medium mb-6">Notifications</h2>
          <div className="p-4 rounded-lg space-y-4 border border-gray-300 bg-gray-100">
            {[
              "🌱 New plant added in Amazon region",
              "⚠️ Plant ID #12 needs maintenance",
              "✅ Activity threshold reached for Plant #3",
              "🌳 Carbon tokens minted successfully",
            ].map((note, idx) => (
              <button
                key={idx}
                className={notificationItemClasses}
                onClick={() => handleMintRequestClick(note)}
                aria-label={`Notification: ${note}. Click to process minting request.`}
              >
                {note}
              </button>
            ))}
          </div>
        </section>
      </section>

      {/* Plant Status Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" aria-label="Plant Status">
        <section className={cardBaseClasses} aria-label="Active Plants">
          <h3 className="font-semibold mb-3">Active Plants :</h3>
          <div className={`${statusNumberClasses} text-green-600`}>12</div>
        </section>
        <section className={cardBaseClasses} aria-label="Inactive Plants">
          <h3 className="font-semibold mb-3">Inactive Plants :</h3>
          <div className={`${statusNumberClasses} text-red-600`}>5</div>
        </section>
        <section className={cardBaseClasses} aria-label="Initializing Plants">
          <h3 className="font-semibold mb-3">Initializing Plants :</h3>
          <div className={`${statusNumberClasses} text-blue-600`}>3</div>
        </section>
        <section className={cardBaseClasses} aria-label="Plants Under Service">
          <h3 className="font-semibold mb-3">Plants Under Service :</h3>
          <div className={`${statusNumberClasses} text-yellow-600`}>2</div>
        </section>
      </section>

      {/* Activity Graph */}
      <section
        className="bg-white/30 rounded-xl shadow-2xl hover:shadow-2xl transition-shadow p-6 h-64 flex items-center justify-center backdrop-blur-md"
        aria-label="Activity Rate Graph"
        role="region"
      >
        <div className="text-gray-400">Activity Rate Graph</div>
      </section>
    </div>
  );
}