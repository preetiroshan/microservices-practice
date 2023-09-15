import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentList = ({ postId }) => {
  const [list, setList] = useState([]);
  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setList(res.data);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  console.log("comment list is", list);
  return <div>CommentList
    {
      list.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))
    }
  </div>;
};

export default CommentList;
