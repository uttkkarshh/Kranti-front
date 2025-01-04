import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { followEvent } from "../../Services/userService";

const EventDetails = ({ event }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUserData(JSON.parse(userString));
    }
  }, []);

  const handleFollow = () => {
    if (userData) {
      followEvent(event.id, userData.id)
        .then(response => {
          console.log('Followed event successfully', response);
        })
        .catch(error => {
          console.error('Error following event', error);
        });
    } else {
      console.error('User not logged in');
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{event.title}</h1>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}</p>
      <p><strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}</p>
      <p><strong>Hosted By:</strong> {event.hostIds.join(", ")}</p>
      <p><strong>Followers:</strong> {event.followerIds.length}</p>

      <button onClick={handleFollow}>Follow Event</button>

      <h2>Location</h2>
      <MapContainer
        center={[event.latitude, event.longitude]} // Event's location
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[event.latitude, event.longitude]}>
          <Popup>
            <strong>{event.title}</strong>
            <br />
            {event.description}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default EventDetails;