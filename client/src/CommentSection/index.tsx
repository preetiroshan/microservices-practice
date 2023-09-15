import React, { useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = ({ comments, postId }) => {
  return (
    <div>
      <CommentForm postId={postId} />
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
