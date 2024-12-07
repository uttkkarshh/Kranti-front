import React, { useState, useEffect } from "react";
import "./Post.css";
import { getUserById } from "../../../Services/userService";
import { getCommentsByPostId, createComment } from "../../../Services/commentService";
import Comment from "../Comment/Comment";
import { likePost } from "../../../Services/postService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likesCount || 0); // Track likes
  const [comments, setComments] = useState([]); // Track comments
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState(null);
  const [showComments, setShowComments] = useState(false); // Toggle comments

  // Fetch author info
  useEffect(() => {
    const loadUser = async (userId) => {
      try {
        const response = await getUserById(userId);
        setAuthor(response.data);
      } catch (error) {
        console.error("Error loading user:", error);
      }
    };

    loadUser(post.userId);
  }, [ ]);

  // Fetch comments for the post
  const fetchComments = async () => {
    try {
      const response = await getCommentsByPostId(post.id);
      setComments(response.data);
     
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

  // Toggle comments visibility
  const handleToggleComments = async () => {
    if (!showComments) {
      await fetchComments(); // Load comments when opening

    }
    setShowComments(!showComments);
  };

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      
      try {
        const response = await createComment({
          content: newComment,
          postId: post.id,
          authorId:5 , // Use logged-in user's ID here
        });
        setComments([...comments, response.data]); // Add new comment
        setNewComment(""); // Clear input
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  // Handle like button click
  const handleLike = async(postId,lik) => {
    try{
      setLikes(lik+1);
   await likePost(postId);
    }
    catch(err){
console.log(err.message)
    }
    // Call API to update likes on the server (e.g., likePost(post.id))
  };

  return (
    <div className="post">
      {/* User Info */}
      <div className="post-header">
        <img
          src={author.profilePicture}
          alt="User Profile"
          className="profile-img"
        />
        <div className="user-info">
          {author && <h1>{author.username}</h1>}
        </div>
      </div>

      {/* Post Content */}
      <div className="post-body">
        <h4>{post.title}</h4>
        
        <img src={post.content} alt="Post Content" className="post-image" />
      </div>

      {/* Post Actions */}
      <div className="post-actions">
      <button onClick={() => handleLike(post.id,likes)}><FontAwesomeIcon icon={faThumbsUp} /> ({likes})</button>

        <button onClick={handleToggleComments}>
        <FontAwesomeIcon icon={faComment} /> {showComments ? "Hide Comments" : "View Comments"}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <ul>
            {comments.map((comment) => (
              
              <li key={comment.id}>
                <Comment content={comment.content} authorName={comment.authorName} />
              </li>
            ))}
          </ul>

          {/* Add Comment */}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
