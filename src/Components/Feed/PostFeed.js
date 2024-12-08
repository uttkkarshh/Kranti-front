import React, { useState, useEffect } from "react";
import Post from "./Post/Post";
import { getAllPosts } from "../../Services/postService"; // Assuming this fetches posts from the backend

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await getAllPosts(); // Fetch the posts from the backend

        setPosts(response.data);
       // console.log(response.data)
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="post-feed">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostFeed;
