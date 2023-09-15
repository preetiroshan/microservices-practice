import React from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

const App = () => {
  return (
    <div>
      Create a Post!
      <PostForm />
      <hr />
      All Posts
      <PostList />
    </div>
  );
};

export default App;
