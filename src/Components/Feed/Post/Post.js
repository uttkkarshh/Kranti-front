import React, { useState, useEffect } from "react";
import "./Post.css";
import { getUserById } from "../../../Services/userService";
import { getCommentsByPostId, createComment } from "../../../Services/commentService";
import Comment from "../Comment/Comment";
import { likePost } from "../../../Services/postService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
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
  }, []);

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
          src={author?.profilePicture || "data:image/png;base64,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"}
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
          <form className="add-comment"onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit"><FontAwesomeIcon icon={faCommentDots} /></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
