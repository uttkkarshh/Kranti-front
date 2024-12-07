import React, { useState } from "react";
import { createPost } from "../../Services/postService"; // Import the API function
//import "./PostCreator.css"; // Optional: Add styling

function PostCreator({ onPostCreated, events }) {
  const [formData, setFormData] = useState({
    "content": "This is my first post! Excited to share updates here.",
  "userId": 5,
  "title": "My 2Post"
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to create the post
      const response = await createPost(formData);
      setMessage("Post created successfully!");
       // Callback to refresh the feed or parent component
      setFormData({
        title: "",
        content: "",
        eventId: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create the post. Please try again.");
    }
  };

  return (
    <div className="post-creator">
      <h2>Create a Post</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter the title of your post"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your post content here..."
          ></textarea>
        </div>
      
        <button type="submit" className="btn-submit">
          Create Post
        </button>
      </form>
    </div>
  );
}

export default PostCreator;
