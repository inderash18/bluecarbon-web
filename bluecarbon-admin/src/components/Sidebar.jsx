import React from "react";

export default function Sidebar({ current, onSelect }) {
  const items = [
    { id: "dashboard", label: "Dashboard" },
    { id: "plants", label: "Plants" },
    { id: "history", label: "History" },
    { id: "mint", label: "Mint" },
  ];

  return (
    <aside className="fixed left-6 top-6 bottom-6 w-52 bg-white/30 backdrop-blur-md shadow-lg rounded-2xl p-4 flex flex-col justify-between border border-gray-100">
      <div>
        <h2 className="text-xl font-semibold text-indigo-600 mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                  current === item.id
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-700 hover:bg-indigo-100"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xs text-gray-500 text-center border-t pt-3 mt-4">
        © 2025 BlueCarbon
      </div>
    </aside>
  );
}