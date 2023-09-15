import React, { useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = ({ postId }) => {
  return (
    <div>
      <CommentForm postId={postId} />
      <CommentList postId={postId} />
    </div>
  );
};

export default CommentSection;
