import React from 'react';

const TimelineDrawer = ({ events, selectedEventId, onSelectEvent }) => {
  return (
    <div style={{ width: '100%', padding: '10px 6px' }}>
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>Event Timeline</h3>
        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#555' }}>Click an item to center map.</p>
      </div>
      {events.length === 0 ? (
        <p style={{ margin: 0 }}>No events available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {events.map((event) => (
            <li
              key={event.id}
              onClick={() => onSelectEvent(event)}
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '8px',
                marginBottom: '6px',
                background: event.id === selectedEventId ? '#f5f2ff' : '#fff',
                border: event.id === selectedEventId ? '1px solid #a17cff' : '1px solid #ddd',
              }}
            >
              <div style={{ fontWeight: 600 }}>{event.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#555' }}>{event.start}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimelineDrawer;
