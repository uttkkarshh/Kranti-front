import React from "react";
import "./Comment.css";

const Comment = ({ content ,authorName}) => {
  return (
    <div className="comment">
      <strong>{authorName}</strong>: {content}
    </div>
  );
};

export default Comment;
