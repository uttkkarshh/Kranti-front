import React, { useState } from "react";
import "./Notification.css";
import { approveFollowRequest } from "../../Services/userService";

const Notification = ({ title, message, timestamp, onClick, id }) => {
  const [isAccepted, setIsAccepted] = useState(false); // Track if the request is accepted

  const handleAccept = async (id, e) => {
    e.stopPropagation(); // Prevent the parent `onClick` from triggering
    try {
      await approveFollowRequest(id); // Call the accept handler (API request)
      setIsAccepted(true); // Update state to show "Accepted"
    } catch (error) {
      console.error(`Error accepting follow request for ID ${id}:`, error);
    }
  };

  return (
    <div className="notification" onClick={onClick}>
      <h4 className="notification-title">{title}</h4>
      <p className="notification-message">{message}</p>
      <small className="notification-timestamp">{timestamp}</small>
      {isAccepted ? ( // Conditionally render based on `isAccepted`
        <span className="notification-accepted">Accepted</span>
      ) : (
        <button
          className="notification-accept-btn"
          onClick={(e) => handleAccept(id, e)}
        >
          Accept
        </button>
      )}
    </div>
  );
};

export default Notification;
