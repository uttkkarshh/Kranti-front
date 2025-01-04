import React, { useState, useEffect } from "react";
import Profile from "../Feed/Profile"
import "./FullProfile.css";
import { getPostsByuser } from "../../Services/postService";
import Post from "../Feed/Post/Post"
import { useLocation } from 'react-router-dom';
const FullProfile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const location = useLocation(); 
  const initialUserData = location.state?.userData || null; 
  const [userData, setUserData] = useState(initialUserData);
   useEffect(() =>{ 
    if (!userData) 
    { const userString = localStorage.getItem("user");
       if (userString) {
       setUserData(JSON.parse(userString));
       } 
     }
     }, 
     [userData]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
      
       const response=await getPostsByuser(userData.id);
        setPosts(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userData]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="full-profile">
      {/* Display Profile at the top */}
      <div className="profile-section">
        <Profile
          name={userData.name}
          bio={userData.bio}
          id={userData.userId}
          profilePicture={userData.profilePicture}
          self={true}
        />
      </div>

      {/* Posts Section */}
      <div className="posts-grid">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
      </div>
    </div>
  );
};

export default FullProfile;
