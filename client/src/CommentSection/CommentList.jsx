import React from "react";

const CommentList = ({ comments }) => {
  console.log("comment list is", comments);
  const handleCommentStatus = (comment) => {
    switch (comment.status) {
      case "pending":
        return "This comment is awaiting confirmation";
      case "approved":
        return comment.content;
      case "rejected":
        return "This comment was rejected";
    }
  };
  return (
    <div>
      CommentList
      {comments.map((comment) => (
        <p key={comment.id}>{handleCommentStatus(comment)}</p>
      ))}
    </div>
  );
};

export default CommentList;
