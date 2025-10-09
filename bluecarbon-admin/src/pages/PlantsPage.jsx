import React from "react";

export default function PlantsPage() {
  return (
    <div className="mt-24 bg-white rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Plants Overview</h2>
      <p className="text-gray-600 mb-4">
        View all plants and their current operational status.
      </p>
      <div className="text-gray-400 text-center py-10">[Plant data table or map will go here]</div>
    </div>
  );
}