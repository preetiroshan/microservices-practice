import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentSection from "./CommentSection/index.tsx";

const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    // Calling queryservice to get allPostsWithComments
    let allPostsWithComments = await axios.get("http://localhost:4002/posts");
    setPosts(allPostsWithComments.data);
  };
  console.log("posts are", posts);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      PostList
      {Object.keys(posts).map((postId) => (
        <div key={postId} className="border border-secondary">
          <h2>{posts[postId].title}</h2>
          <div className="border border-secondary">
            <CommentSection postId={postId} comments={posts[postId].comments} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
