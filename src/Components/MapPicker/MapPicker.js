import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPicker = ({ onLocationSelect, center = [23.5120, 80.3290], zoom = 13 }) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng); // Pass location to parent component
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <MapContainer
      center={center} // Use provided center or default
      zoom={zoom} // Use provided zoom or default
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;
