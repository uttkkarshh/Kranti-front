import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { getAllUsers } from "../../Services/userService"; // API function to fetch users
import "./Profile.css"
function Feed() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
      //S  console.log(response.data)
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="feed">
      <h1>User Feed</h1>
      {error && <p className="error">{error}</p>}
      <div className="user-list">
        {users.length > 0 ? (
          users.map((user) => (
            <Profile
              key={user.id}
              name={user.username}
              bio={user.bio}
              id={user.id}
            />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
