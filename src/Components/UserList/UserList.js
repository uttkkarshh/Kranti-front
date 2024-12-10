import React, {  useState } from "react";
import Profile from "../Feed/Profile";
import "../Feed/Profile.css"
import "./UserList.css"
function UserList({user,head}) {
  

  const [users, setUsers] = useState(user || []);

  return (
    <div className="follow-list">
      <h1>{head}</h1>
      
      <div className="list-div">
        {users && users.length > 0 ? (
          users.map((user) => (
            <Profile
              key={user.id}
              name={user.username}
              bio={user.bio}
              id={user.id}
              profilePicture={user.profilePicture}
              self={true}
            />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default UserList;
