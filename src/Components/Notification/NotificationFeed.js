import Notification from "./Notification";
import "./NotificationFeed.css";
import { useEffect, useState } from "react";
import { getnotification } from "../../Services/userService";

const NotificationFeed = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const jsonString = localStorage.getItem("user");
        const user = JSON.parse(jsonString);

        // Call the API and await the response
        const response = await getnotification(user.id);

        // Map the data into the desired notification format
        const notificationsArr = response.data.map((notif) => ({
          title: "New Message",
          message: `${notif.senderName} sent a follow  to you.`,
          timestamp: new Date().toLocaleTimeString(),
          id:notif.id
        }));

        // Update the state with the formatted notifications
        setNotifications(notificationsArr);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="notification-feed">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Notification
            key={index}
            id={notification.id}
            title={notification.title}
            message={notification.message}
            timestamp={notification.timestamp}
            onClick={() => console.log(`Notification ${index + 1} clicked`)}
          />
        ))
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default NotificationFeed;
