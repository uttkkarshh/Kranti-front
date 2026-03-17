import React from 'react';
import { Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

const defaultIcon = L.divIcon({
  className: 'event-pin',
  html: `<div style="background:#f05a28;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid #fff;">E</div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

const EventPin = ({ event }) => {
  const { lat, lng } = event.location;

  return (
    <>
      <Marker position={[lat, lng]} icon={defaultIcon}>
        <Popup>
          <div style={{ minWidth: '180px' }}>
            <h4 style={{ margin: '0 0 6px 0' }}>{event.title}</h4>
            <p style={{ margin: 0 }}>{event.description}</p>
            <small>
              {event.start} - {event.end}
            </small>
          </div>
        </Popup>
      </Marker>
      <CircleMarker center={[lat, lng]} radius={4} pathOptions={{ color: '#f05a28', fillColor: '#f05a28', fillOpacity: 0.6 }} />
    </>
  );
};

export default EventPin;
