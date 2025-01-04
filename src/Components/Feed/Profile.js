import React from "react";
import  { useEffect, useState } from "react";
import userService from "../../Services/userService"
import { followUser } from "../../Services/userService";
import "./Profile.css"
import { getfollowers,getfollowing } from "../../Services/userService";
import UserList from"../UserList/UserList"
import { useNavigate } from 'react-router-dom';
function Profile({ name, bio ,id,profilePicture ,self}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const[followerslist,setFollowers]=useState([]);
  const[followinglist,setFollowing]=useState([]);
  const[followersbool,Setfollowerbool]=useState(false);
  const[followingbool,Setfollowingbool]=useState(false);
  const navigate = useNavigate();
  const handleFollow = async(userId, isFollowing) => {
    console.log(
      `${isFollowing ? "Followed" : "Unfollowed"} user with ID: ${userId}`
    );
    const jsonString = localStorage.getItem("user");
    const parsedObject = JSON.parse(jsonString);
    //console.log(parsedObject)
    
      await followUser(id, parsedObject.id) .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        if (error.response) {
          // The server responded with an error status code (e.g., 400, 500)
        
          alert(`Error: ${error.response.data}`); // Display the error message to the user
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error:', error.message);
        }
      });
    
    // Example: Make an API call here
    // await fetch(`/api/users/${userId}/follow`, { method: 'POST', body: JSON.stringify({ isFollowing }) });
  };
   // Fetch followers list on "Followers" button click
   const handleFetchFollowers = async () => {
    if(followersbool){
     
      Setfollowerbool(!followersbool);
      return;
    }
    try {
      const data = await getfollowers(id); // API call to get followers
      setFollowers(data.data); // Update state with fetched followers
      console.log("Followers fetched:", data);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
    Setfollowerbool(!followersbool)
  };

  // Fetch following list on "Following" button click
  const handleFetchFollowing = async () => {
    if(followingbool){
     
      Setfollowingbool(!followingbool);
      return;
    }
    try {
      const data = await getfollowing(id); // API call to get following
      setFollowing(data.data); // Update state with fetched following
      console.log("Following fetched:", data);
    } catch (error) {
      console.error("Error fetching following:", error);
    }
    Setfollowingbool(!followingbool)
  };
  const[bol,setbol]=useState(self);
  const handleUserClick = () => {
    // Navigate to the profile page and pass user data as state
    
const user = { name, bio, id, profilePicture };
    navigate("/home/profile", { state: { userData: user } });
  };
  return (
    <div className="user-profile">
     <div className="profile-header">
                <img src={profilePicture} onClick={handleUserClick} alt="User Profile" className="profile-image" />
                <h2 className="user-name">{name}</h2>
                <p className="user-bio">{bio}</p>
            </div>
    { !bol && (<>
    <div className="list-button">
      <button onClick={handleFetchFollowers} className="followlist">Followers</button>
      <button onClick={handleFetchFollowing}className="followlist" >Following</button>
      
      <button onClick={handleFollow} className="followlist">
        {isFollowing ? "Unfollow" : "Follow"}
      </button></div>
    </>)}
    {followersbool && <UserList className="follow-list" user={followerslist} head={'Followers'}/>}
    {followingbool && <UserList  className="follow-list" head ={'Following'} user={followinglist}/>}
    </div>

    
  );
}

export default Profile;
