import React from 'react';
import './Card.css';

function EventCard({ title, description, startDate, endDate, latitude, longitude }) {
  return (
    <div className="event-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        <strong>Start:</strong> {new Date(startDate).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(endDate).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong> {latitude}, {longitude}
      </p>
    </div>
  );
}

export default EventCard;
