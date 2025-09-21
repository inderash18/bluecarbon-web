// src/modules/MapView.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView() {
  const plantations = [
    { id: 1, lat: 12.9716, lng: 77.5946, name: "Bangalore Plantation" },
    { id: 2, lat: 13.0827, lng: 80.2707, name: "Chennai Restoration Site" },
  ];

  return (
    <div>
      <h2>Project Map</h2>
      <MapContainer center={[12.9716, 77.5946]} zoom={6} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {plantations.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
