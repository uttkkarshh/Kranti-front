import React, { useEffect, useState, useContext } from "react";
import userService from "../../Services/userService"
import { followUser } from "../../Services/userService";
import "./Profile.css"
import { getfollowers,getfollowing } from "../../Services/userService";
import UserList from"../UserList/UserList"
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Contexts/UserContext";
function Profile({ name, bio ,id,profilePicture ,self}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState("");
  const[followerslist,setFollowers]=useState([]);
  const[followinglist,setFollowing]=useState([]);
  const[followersbool,Setfollowerbool]=useState(false);
  const[followingbool,Setfollowingbool]=useState(false);
  const navigate = useNavigate();
  const { user: currentUser } = useContext(UserContext);

  const handleFollow = async (userId) => {
    console.log('handleFollow called with', userId, 'currentUser', currentUser);
    if (!currentUser?.id) {
      console.warn('no current user available for follow');
      setError('You must be logged in to follow users.');
      return;
    }

    try {
      const response = await followUser(userId, currentUser.id);
      console.log('Follow API success:', response.data);
      setIsFollowing(true);
    } catch (error) {
      if (error.response) {
        console.error(
          'Follow error – status',
          error.response.status,
          'data',
          error.response.data
        );
        setError(`Unable to follow user: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('No response received for follow request:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error setting up follow request:', error.message);
        setError('Unexpected error occurred');
      }
    }
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
            {error && <p className="error-text">{error}</p>}
    { !bol && (<>
    <div className="list-button">
      <button onClick={handleFetchFollowers} className="followlist">Followers</button>
      <button onClick={handleFetchFollowing}className="followlist" >Following</button>
      
      <button onClick={() => handleFollow(id)} className="followlist">
        {isFollowing ? "Unfollow" : "Follow"}
      </button></div>
    </>)}
    {followersbool && <UserList className="follow-list" user={followerslist} head={'Followers'}/>}
    {followingbool && <UserList  className="follow-list" head ={'Following'} user={followinglist}/>}
    </div>

    
  );
}

export default Profile;
