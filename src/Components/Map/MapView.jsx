import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import EventPin from './EventPin';
import TimelineDrawer from './TimelineDrawer';
import { useMapTap } from './useMapEvents';
import { mapStyles } from './mapStyles';

const sampleEvents = [
  { id: 1, title: 'Freedom March', description: 'Community march at main plaza', start: '10:00 AM', end: '12:30 PM', location: { lat: 23.5120, lng: 80.3300 } },
  { id: 2, title: 'Youth Meetup', description: 'Youth leader panel discussion', start: '2:00 PM', end: '4:00 PM', location: { lat: 23.5190, lng: 80.3230 } },
  { id: 3, title: 'Street Cleanup', description: 'Neighborhood street cleaning event', start: '5:00 PM', end: '7:00 PM', location: { lat: 23.5070, lng: 80.3400 } },
];

const MapView = () => {
  const [selectedEvent, setSelectedEvent] = useState(sampleEvents[0]);
  const [selectedLatLng, setSelectedLatLng] = useState({ lat: 23.5120, lng: 80.3290 });

  const mapCenter = useMemo(() => [selectedLatLng.lat, selectedLatLng.lng], [selectedLatLng]);

  const handleMapClick = (latlng) => {
    console.log('Map clicked at', latlng);
    setSelectedLatLng(latlng);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedLatLng(event.location);
  };

  useMapTap({ onClick: handleMapClick });

  return (
    <div style={{ ...mapStyles.container, minHeight: '520px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 12px', background: '#fff', borderBottom: '1px solid #ddd' }}>
        <h2 style={{ margin: 0 }}>MapView</h2>
        <p style={{ margin: '4px 0 0', color: '#333' }}>Interactive map with event pins and timeline.</p>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer center={mapCenter} zoom={13} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sampleEvents.map((event) => (
            <EventPin key={event.id} event={event} />
          ))}
        </MapContainer>

        <div style={{ ...mapStyles.drawer, right: '10px', top: '70px', width: '280px' }}>
          <TimelineDrawer
            events={sampleEvents}
            selectedEventId={selectedEvent?.id}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default MapView;
