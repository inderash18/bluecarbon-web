import React from "react";

export default function HistoryPage() {
  return (
    <div className="mt-24 bg-white rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>
      <p className="text-gray-600 mb-4">
        View all token minting and carbon credit transaction logs.
      </p>
      <div className="text-gray-400 text-center py-10">[Transaction history table will appear here]</div>
    </div>
  );
}