import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentList = ({ comments }) => {
  console.log("comment list is", comments);
  return <div>CommentList
    {
      comments.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))
    }
  </div>;
};

export default CommentList;
