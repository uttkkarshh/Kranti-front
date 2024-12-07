import React from "react";
import  { useEffect, useState } from "react";
import userService from "../../Services/userService"
import { followUser } from "../../Services/userService";
import "./Profile.css"
function Profile({ name, bio ,id }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const handleFollow = (userId, isFollowing) => {
    console.log(
      `${isFollowing ? "Followed" : "Unfollowed"} user with ID: ${userId}`
    );
    const jsonString = localStorage.getItem("user");
    const parsedObject = JSON.parse(jsonString);
    //console.log(parsedObject)
   followUser(id,parsedObject.id);
    // Example: Make an API call here
    // await fetch(`/api/users/${userId}/follow`, { method: 'POST', body: JSON.stringify({ isFollowing }) });
  };
  return (
    <div className="user-profile">
      
      <h2 className="user-name">{name}</h2>
      <p className="user-bio">{bio}</p>
      <button onClick={handleFollow} className="follow-btn">
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default Profile;
